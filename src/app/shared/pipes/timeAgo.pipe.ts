import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  timeDiffs = {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  };

  transform(value: string | Date): any {
    const now = Date.now();
    const then = new Date(value).getTime();
    const diff = now - then;

    let result: string;

    switch (true) {
      case (diff < this.timeDiffs.minute):
        result = 'Il y a quelques secondes';
        break;
      case (diff < this.timeDiffs.hour):
        result = 'Il y a quelques minutes';
        break;
      case (diff < this.timeDiffs.day):
        result = 'Il y a quelques heures';
        break;
      case (diff < this.timeDiffs.week):
        result = 'Il y a quelques jours';
        break;
      case (diff < this.timeDiffs.month):
        result = 'Il y a quelques semaines';
        break;
      case (diff < this.timeDiffs.year):
        result = 'Il y a quelques mois';
        break;
      default:
        result = 'Il y a plus d\'un an';
    }

    return result;
  }
}
