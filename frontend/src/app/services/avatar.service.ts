import {Injectable} from '@angular/core';

export interface Avatar {
  cost: number;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private avatars: Avatar[] = [
    {cost: 0, path: '/assets/avatars/img.png'},
  ];

  constructor() {
  }

  get_by_id(id: number): Avatar {
    return this.avatars[id];
  }

  get() {
    return this.avatars;
  }
}
