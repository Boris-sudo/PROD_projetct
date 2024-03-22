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
    {cost: 0, color: '#d3ff00', edit_color: '#000000'},
    {cost: 0, color: '#3fff00', edit_color: '#000000'},
  ];

  constructor() {
  }

  get_by_id(id: number): Background {
    return this.backgrounds[id];
  }

  get() {
    return this.backgrounds;
  }

  get_id(item: Background) {
    for (let i = 0; i < this.backgrounds.length; i++)
      if (this.backgrounds[i] == item)
        return i;
    return 0;
  }
}
