import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Matches,
} from "class-validator";
import { startsWith } from "../decorators/starts-with.decorator";

export enum TaskTags {
  WORK = "work",
  HOME = "home",
  STYDY = "study",
}

export class CreateTaskDto {
  @IsString({ message: "Tittle must be a string" })
  @IsNotEmpty({ message: "Tittle is cannot be empty" })
  @Length(3, 50, { message: "Tittle must be between 3 and 50 characters" })
  @startsWith("Task:")
  tittle: string;

  @IsString({ message: "description must be a string" })
  @IsOptional()
  description: string;

  @IsBoolean({ message: "isCompleted must be a boolean" })
  isCompleted: boolean;

  @IsNumber()
  @IsInt({ message: "priority must be an integer" })
  @IsPositive({ message: "priority must be a positive number" })
  priority: number;

  @IsArray({ message: "tags must be an array" })
  @IsEnum(TaskTags, {
    each: true,
    message: "each tag must be one of the following: work, home, study",
  })
  @IsOptional()
  tags: TaskTags[];

  @IsString({ message: "password must be a string" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      "password must be at least 8 characters long and contain at least one letter and one number",
  })
  password: string;

  @IsString({ message: "url must be a string" })
  @IsUrl(
    {
      protocols: ["http", "https"],
      require_valid_protocol: true,
      host_blacklist: ["example.com"],
    },
    { message: "invalid format URL" },
  )
  url: string;
}
