import { IsString } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class EmailVerification {
  @PrimaryColumn()
  token: string

  @Column()
  email: string

  @Column({type: "boolean"})
  verified: boolean
}


export class EmailVerificationDTO {
  @IsString()
  token: string
}