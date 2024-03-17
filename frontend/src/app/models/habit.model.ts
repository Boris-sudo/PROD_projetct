export interface HabitModel {
  id: number;

  title: string;
  period: 'daily' | 'weekly' | 'monthly';
  addDate: Date;

  is_boolean: boolean;

  targetValue?: number;
}


export interface HabitsCollectionModel {
  title: string;
  habits: HabitModel[];
}
