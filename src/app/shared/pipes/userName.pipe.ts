import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {
  transform(value: { firstName: string, lastName: string }, locale: 'en' | 'fr' = 'fr'): string {
    return locale === 'fr' ? `${value.lastName.toUpperCase()}
    ${value.firstName[0].toUpperCase()}${value.firstName.substring(1).toLowerCase()}` :
      `${value.firstName[0].toUpperCase()}${value.firstName.substring(1).toLowerCase()} ${value.lastName}`
  }
}
