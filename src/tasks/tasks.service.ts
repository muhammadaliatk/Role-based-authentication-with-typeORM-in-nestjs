import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { timeLog } from 'console';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {

constructor(
  @InjectRepository(TaskRepository)
  private tasksRepository:TaskRepository,){}

  async create(createTaskDto: CreateTaskDto) {

    const {title,description} = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status:TaskStatus.OPEN
    })
    await this.tasksRepository.save(task)
    return task;
  }

  async findAll() {
    return this.tasksRepository.find();
  }

  async findOne(id: string) : Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where:{
        id:id
      }
    });
    if(!task){
      throw new NotFoundException('Task not found')
    }
    return task; 
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const {title,description} = updateTaskDto;
    const task = await this.findOne(id)
    task.title = title;
    task.description = description;
    await this.tasksRepository.save(task)
    return task;
  }

  async deleteTask(id: string) {
   const task = await this.tasksRepository.delete(id)
    return task;
  }
}


