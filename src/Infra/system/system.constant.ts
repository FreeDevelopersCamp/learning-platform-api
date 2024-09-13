import { Injectable } from '@nestjs/common';
import { ResourceTenancyDto } from 'src/modules/core/dto/tenancy/resource.tenancy';

@Injectable()
export class System {
  static tenancies: Array<ResourceTenancyDto> = new Array<ResourceTenancyDto>();
}

export class UserRequested {
  static userId: string;
  static username: string;
  static tenancyId: string;
}

export class DeviceInfo {
  static ip: string;
  static deviceName: string;
  static browser: string;
}
