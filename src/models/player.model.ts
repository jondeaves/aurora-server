import { Column, Model, Table, PrimaryKey} from 'sequelize-typescript';

@Table({tableName: 'player'})
export class Player extends Model {
  @Column
  username: string;

  @Column({ defaultValue: 0 })
  x: number;

  @Column({ defaultValue: 0 })
  y: number;

  @Column({ defaultValue: 0 })
  r: number;
}
