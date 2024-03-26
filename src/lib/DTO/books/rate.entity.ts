import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";
import { User } from "../auth/user.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Rate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column({enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]})
  rate: number

  @ApiProperty()
  @ManyToOne(() => Book, {
    cascade: false
  })
  @JoinColumn()
  book: Book

  @ApiProperty()
  @ManyToOne(() => User, {
    cascade: false
  })
  @JoinColumn()
  user: User
}