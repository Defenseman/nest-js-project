import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    findAll(): {
        id: number;
        tittle: string;
        description: string;
        isCompleted: boolean;
    }[];
    findById(id: string): {
        id: number;
        tittle: string;
        description: string;
        isCompleted: boolean;
    };
    create(dto: CreateTaskDto): {
        id: number;
        tittle: string;
        description: string;
        isCompleted: boolean;
    }[];
    update(id: string, dto: UpdateTaskDto): {
        id: number;
        tittle: string;
        description: string;
        isCompleted: boolean;
    }[];
    patchUpdate(id: string, dto: Partial<UpdateTaskDto>): {
        id: number;
        tittle: string;
        description: string;
        isCompleted: boolean;
    };
    delete(id: string): {
        id: number;
        tittle: string;
        description: string;
        isCompleted: boolean;
    };
}
