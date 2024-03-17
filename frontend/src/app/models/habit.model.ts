export interface HabitModel {
  title: string;
  period: 'daily' | 'weekly' | 'monthly';
  addDate: Date;

  type: 'checkbox' | 'value';

  targetValue?: number;
}


export interface HabitsCollectionModel {
  title: string;
  habits: HabitModel[];
}
