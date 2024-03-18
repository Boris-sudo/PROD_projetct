export interface HabitModel {
  title: string;
  period: 'daily' | 'weekly' | 'monthly';
  addDate: Date;

  type: 'boolean' | 'numeric';

  targetValue?: number;
}


export interface HabitsCollectionModel {
  title: string;
  habits: HabitModel[];
}
