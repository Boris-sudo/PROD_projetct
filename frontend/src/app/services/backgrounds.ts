import {Injectable} from '@angular/core';

export interface Background {
  cost: number;
  color: string;
  edit_color: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private backgrounds: Background[] = [
    {cost: 0, color: '#0000f4', edit_color: '#ffffff'},
  ];

  constructor() {
  }

  get_by_id(id: number): Background {
    return this.backgrounds[id];
  }

  get() {
    return this.backgrounds;
  }
}
