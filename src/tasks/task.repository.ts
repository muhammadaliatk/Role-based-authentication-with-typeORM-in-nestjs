import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Task } from "./tasks.entity";


@Injectable()
export class TaskRepository extends Repository<Task> {
 
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
}


