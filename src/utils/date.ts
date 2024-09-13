import { DateTime } from 'luxon';
import configurations from 'src/config/configurations';

type GetDateWithFormatFormatInput = {
  date?: Date;
  format?: string;
};

export class DateUtils {
  static getDateStringWithFormat(
    input: Partial<GetDateWithFormatFormatInput> = {},
  ): string {
    if (!input?.date) {
      Object.assign(input, { date: DateUtils.getJSDate() });
    }

    if (!input?.format) {
      Object.assign(input, { format: configurations().time.format });
    }

    return DateTime.fromJSDate(input.date, { zone: 'utc' })
      .setZone(configurations().time.zone)
      .toFormat(input.format);
  }

  static getISODateString(): string {
    return DateTime.fromJSDate(DateUtils.getJSDate(), { zone: 'utc' })
      .setZone(configurations().time.zone)
      .toJSON();
  }

  static getJSDate(): Date {
    return DateTime.fromJSDate(DateTime.now().toJSDate(), { zone: 'utc' })
      .setZone(configurations().time.zone)
      .toJSDate();
  }

  static getDate(): DateTime {
    return DateTime.fromJSDate(DateUtils.getJSDate(), { zone: 'utc' }).setZone(
      configurations().time.zone,
    );
  }

  static convertSecondsToJSDate(seconds: number): Date {
    return new Date(seconds * 1000);
  }
}
