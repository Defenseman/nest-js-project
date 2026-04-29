import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TaskService {
  private tasks = [
    {
      id: 1,
      tittle: "Task 1",
      description: "This is task 1",
      isCompleted: false,
    },
    {
      id: 2,
      tittle: "Task 2",
      description: "This is task 2",
      isCompleted: true,
    },
  ];
  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  create(task: CreateTaskDto) {
    const { tittle, description, isCompleted } = task;
    const newTask = {
      id: this.tasks.length + 1,
      tittle,
      description,
      isCompleted,
    };
    this.tasks.push(newTask);
    return this.tasks;
  }

  update(id: number, dto: UpdateTaskDto) {
    const { tittle, description, isCompleted } = dto;
    const task = this.findById(id);
    task.tittle = tittle;
    task.description = description;
    task.isCompleted = isCompleted;
    return this.tasks;
  }

  patchUpdate(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(id);
    Object.assign(task, dto);
    return task;
  }

  delete(id: number) {
    const task = this.findById(id);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    return task;
  }
}
