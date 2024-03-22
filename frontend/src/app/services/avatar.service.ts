import {Injectable} from '@angular/core';
import {Background} from "./backgrounds";

export interface Avatar {
  cost: number;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private avatars: Avatar[] = [
    {cost: 0, path: '/assets/avatars/free1.png'},
    {cost: 0, path: '/assets/avatars/free2.png'},
    {cost: 0, path: '/assets/avatars/free3.png'},
    {cost: 0, path: '/assets/avatars/free4.png'},
  ];

  constructor() {
  }

  get_by_id(id: number): Avatar {
    return this.avatars[id];
  }

  get() {
    return this.avatars;
  }

  get_id(item: Avatar) {
    for (let i = 0; i < this.avatars.length; i++)
      if (this.avatars[i] == item)
        return i;
    return 0;
  }
}
