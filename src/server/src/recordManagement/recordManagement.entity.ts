import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RecordManagement {
  @PrimaryGeneratedColumn()
  id: number;
  // 文件名
  @Column()
  name: string;
  // mime类型
  @Column()
  mimetype: string;
  // 大小
  @Column()
  size: string;
  // 记录
  @Column("json")
  logs;
  // 路径
  @Column()
  path: string;
  // 原始名称
  @Column()
  originalname: string;
  // 编码格式
  @Column()
  encoding: string;
}
