"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startsWith = startsWith;
const class_validator_1 = require("class-validator");
function startsWith(prefix, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: "startsWith",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return typeof value === "string" && value.startsWith(prefix);
                },
                defaultMessage(args) {
                    return `${args.property} must start with "${prefix}"`;
                },
            },
        });
    };
}
//# sourceMappingURL=starts-with.decorator.js.map