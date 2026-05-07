import { type ValidationOptions } from "class-validator";
export declare function startsWith(prefix: string, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
