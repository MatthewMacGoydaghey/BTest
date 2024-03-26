import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";
import { Rate } from "./rate.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Book {
  @ApiProperty()
@PrimaryGeneratedColumn()
id: number

@ApiProperty()
@Column()
title: string

@ApiProperty()
@Column()
year: number

@ApiProperty()
@Column("text", {array: true})
generes: string[]

@ApiProperty()
@Column("text", {array: true})
authors: string[]

@OneToMany(() => Rate, (rate) => rate.book)
rates: Rate[]
}