export interface HabitModel {
  id: number;

  title: string;
  period: 'daily' | 'weekly' | 'monthly';
  addDate: Date;
  deletedDate: Date;

  type: 'boolean' | 'numeric';

  targetValue?: number;
  doneValue?: number;
}


export interface HabitsCollectionModel {
  title: string;
  habits: HabitModel[];
}
