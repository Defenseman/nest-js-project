import { TaskService } from "../task/task.service";
export declare class MovieService {
    private readonly taskService;
    constructor(taskService: TaskService);
    getHello(): Promise<{
        message: string;
    }>;
}
