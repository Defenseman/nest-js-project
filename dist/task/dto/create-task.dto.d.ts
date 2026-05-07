export declare enum TaskTags {
    WORK = "work",
    HOME = "home",
    STYDY = "study"
}
export declare class CreateTaskDto {
    tittle: string;
    description: string;
    isCompleted: boolean;
    priority: number;
    tags: TaskTags[];
    password: string;
    url: string;
}
