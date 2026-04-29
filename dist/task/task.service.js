"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
let TaskService = class TaskService {
    tasks = [
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
    findById(id) {
        const task = this.tasks.find((task) => task.id === id);
        if (!task) {
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }
    create(task) {
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
    update(id, dto) {
        const { tittle, description, isCompleted } = dto;
        const task = this.findById(id);
        task.tittle = tittle;
        task.description = description;
        task.isCompleted = isCompleted;
        return this.tasks;
    }
    patchUpdate(id, dto) {
        const task = this.findById(id);
        Object.assign(task, dto);
        return task;
    }
    delete(id) {
        const task = this.findById(id);
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        return task;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)()
], TaskService);
//# sourceMappingURL=task.service.js.map