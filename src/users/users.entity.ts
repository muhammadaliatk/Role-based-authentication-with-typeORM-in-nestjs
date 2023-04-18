import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
  }

@Entity()
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Unique(['username']) 
    @Column()
    username:string;

    @Column()
    password:string;
  
    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role:Role;

}
