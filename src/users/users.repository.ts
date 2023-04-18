import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Users } from "./users.entity";

@Injectable()
export class UsersRepository extends Repository<Users>{
    constructor(private dataSource: DataSource) {
        super(Users, dataSource.createEntityManager());
      }
}