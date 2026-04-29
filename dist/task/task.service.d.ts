import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
export declare class TaskService {
    private tasks;
    findAll(): {
        id: number;
        tittle: string;
        description: string;
        isCompleted: boolean;
    }[];
    findById(id: number): {
        id: number;
        tittle: string;
        description: string;
        isCompleted: boolean;
    };
    create(task: CreateTaskDto): {
        id: number;
        tittle: string;
        description: string;
        isCompleted: boolean;
    }[];
    update(id: number, dto: UpdateTaskDto): {
        id: number;
        tittle: string;
        description: string;
        isCompleted: boolean;
    }[];
    patchUpdate(id: number, dto: Partial<UpdateTaskDto>): {
        id: number;
        tittle: string;
        description: string;
        isCompleted: boolean;
    };
    delete(id: number): {
        id: number;
        tittle: string;
        description: string;
        isCompleted: boolean;
    };
}
