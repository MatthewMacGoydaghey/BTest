import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
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
generes: string

@ApiProperty()
@Column()
author: string

@ApiProperty()
@CreateDateColumn()
publicationDate: string
}