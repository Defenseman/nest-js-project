import { PipeTransform } from "@nestjs/common";

export class StringToLowerCasePipe implements PipeTransform {
    transform(value: string) {
        if (typeof value === 'string') {
            return value.toLowerCase();
        }
        return value;
    }
}