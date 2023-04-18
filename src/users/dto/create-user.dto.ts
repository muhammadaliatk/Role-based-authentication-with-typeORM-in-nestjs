import { Unique } from "typeorm";
import { Role } from "../users.entity";

export class CreateUserDto {
    username:string;
    password:string;
    role:Role;
}
