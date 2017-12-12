import moment, {Moment} from 'moment-timezone';
import {NumberUtils} from './NumberUtils';
import {SelectOptionType} from './types/InputTypes';

export class DateUtils {
  static convertOffset(date: number, timezone: string): number {
    let offset: string;

    if(timezone) {
      offset = moment().tz(timezone).format('Z');
    } else {
      offset = moment().format('Z');
    }

    const formatted: string = DateUtils.cleanTime(moment(date)).format(`YYYY-MM-DD HH:mm:00.000[${offset}]`);
    return +(moment(formatted).format('x'));
  }

  static resetDay(dateTime: Moment): Moment {
    const nowObj: Moment = moment();
    return DateUtils.cleanTime(dateTime).year(nowObj.year()).month(nowObj.month()).date(nowObj.date());
  }

  static resetTimezone(dateTime: Moment): Moment {
    const formatted: string = DateUtils.cleanTime(dateTime).format(`YYYY-MM-DD HH:mm:00.000[-05:00]`);
    return moment(formatted);
  }

  static setTimezone(dateTime: Moment, offset, timezone: string): Moment {
    const formatted: string = DateUtils.cleanTime(dateTime).tz(timezone).format(`YYYY-MM-DD HH:mm:00.000[${offset}]`);
    return moment(formatted);
  }

  static matchTimezone(dateTime: Moment, anotherDateTime: Moment, timezone: string): Moment {
    const offset: string = anotherDateTime.format('Z');
    return DateUtils.setTimezone(dateTime, offset, timezone);
  }

  static cleanTime(dateTime: Moment): Moment {
    return dateTime.clone().second(0).millisecond(0);
  }

  static formatRelativeTime(dateTime: number): string {
    // Format timestamp
    const now = moment();
    const date = moment(dateTime);
    const diffHours: number = now.diff(date, 'hours');
    let formatted: string;

    if(diffHours <= 3) {
      formatted = date.fromNow();
    } else {
      const diffDays: number = now.diff(date, 'days');

      if(diffDays < 7) {
        formatted = date.format('dddd @ h:mma');
      } else {
        formatted = date.format('ddd, MMM D @ h:mma');
      }
    }

    return formatted;
  }

  static getFutureYearItems(): SelectOptionType[] {
    const years: any[] = new Array(15).fill(0);

    return years.map((item, index: number) => {
      const year: number = moment().year() + index;
      return {label: year.toString(), value: year};
    });
  }

  static getMonthItems(): SelectOptionType[] {
    const months: any[] = new Array(12).fill(0);

    return months.map((item, index: number) => {
      return {label: moment().month(index).format('MMMM'), value: index + 1};
    });
  }

  static getDayItems(): SelectOptionType[] {
    const days: any[] = new Array(31).fill(0);

    return days.map((item, index: number) => {
      const day: number = index + 1;
      return {label: NumberUtils.pad(day, 2), value: day};
    });
  }
}
