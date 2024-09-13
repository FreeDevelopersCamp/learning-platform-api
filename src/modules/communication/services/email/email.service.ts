import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import * as nodemailer from 'nodemailer';
import { Email } from '../../entity/email/email.schema';
import { ResourceEmailDto } from '../../dto/email/resource.email';
import { CreateEmailDto } from '../../dto/email/create.email';
import { EmailValidationService } from './email.validation.service';

@Injectable()
export class EmailService {
  private readonly _repo: IMongoRepository<Email>;
  private readonly transporter: nodemailer.Transporter;

  constructor(
    @Inject('EMAIL_MODEL') private _emailModel: Model<Email>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly emailValidationService: EmailValidationService,
  ) {
    this._repo = new MongoRepository<Email>(_emailModel);

    // Configure the email transporter
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // Replace with your SMTP host
      port: 587, // Replace with your SMTP port
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'user@example.com', // Replace with your SMTP user
        pass: 'password', // Replace with your SMTP password
      },
    });
  }

  async list(): Promise<ResourceEmailDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Email,
      ResourceEmailDto,
    );
  }

  async getById(id: string): Promise<ResourceEmailDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Email,
      ResourceEmailDto,
    );
  }

  async create(dto: CreateEmailDto): Promise<ResourceEmailDto> {
    if (!this.emailValidationService.validateEmailFormat(dto.email)) {
      throw new Error('Invalid email format');
    }

    if (!(await this.emailValidationService.validateDomain(dto.email))) {
      throw new Error('Invalid email domain');
    }

    const emailSent = await this.sendEmail({
      to: dto.email,
      subject: 'Welcome!',
      text: 'Thank you for registering!',
    });

    if (!emailSent) {
      throw new Error('Failed to send email');
    }

    return this._mapper.map(
      await this._repo.create(new this._emailModel(dto)),
      Email,
      ResourceEmailDto,
    );
  }

  private async sendEmail(
    mailOptions: nodemailer.SendMailOptions,
  ): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: '"No Reply" <no-reply@example.com>', // sender address
        ...mailOptions,
      });
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }
}
