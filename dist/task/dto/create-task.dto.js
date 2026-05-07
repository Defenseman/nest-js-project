"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskDto = exports.TaskTags = void 0;
const class_validator_1 = require("class-validator");
const starts_with_decorator_1 = require("../decorators/starts-with.decorator");
var TaskTags;
(function (TaskTags) {
    TaskTags["WORK"] = "work";
    TaskTags["HOME"] = "home";
    TaskTags["STYDY"] = "study";
})(TaskTags || (exports.TaskTags = TaskTags = {}));
class CreateTaskDto {
    tittle;
    description;
    isCompleted;
    priority;
    tags;
    password;
    url;
}
exports.CreateTaskDto = CreateTaskDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "Tittle must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Tittle is cannot be empty" }),
    (0, class_validator_1.Length)(3, 50, { message: "Tittle must be between 3 and 50 characters" }),
    (0, starts_with_decorator_1.startsWith)("Task:"),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "tittle", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "description must be a string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: "isCompleted must be a boolean" }),
    __metadata("design:type", Boolean)
], CreateTaskDto.prototype, "isCompleted", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)({ message: "priority must be an integer" }),
    (0, class_validator_1.IsPositive)({ message: "priority must be a positive number" }),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: "tags must be an array" }),
    (0, class_validator_1.IsEnum)(TaskTags, {
        each: true,
        message: "each tag must be one of the following: work, home, study",
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTaskDto.prototype, "tags", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "password must be a string" }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: "password must be at least 8 characters long and contain at least one letter and one number",
    }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "url must be a string" }),
    (0, class_validator_1.IsUrl)({
        protocols: ["http", "https"],
        require_valid_protocol: true,
        host_blacklist: ["example.com"],
    }, { message: "invalid format URL" }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "url", void 0);
//# sourceMappingURL=create-task.dto.js.map