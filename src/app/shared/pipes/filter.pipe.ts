import {Pipe, PipeTransform} from '@angular/core';
import {BlogUser} from '@shared/interfaces';

@Pipe({
  name: 'FilterPipe'
})
export class FilterPipe implements PipeTransform {
  transform(users: BlogUser[], search: string = ''): BlogUser[] {
    if (!search.trim()) {
      return users;
    }

    return users.filter((user: BlogUser) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
