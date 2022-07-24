import { registerDecorator, ValidationOptions } from "class-validator";

export function IsNumeric(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsNumeric',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(input: any) {
                    let is_valid;
                    try { is_valid = /^\d+$/.test(input.toString())} catch {}
                    return is_valid
                }
            }
        })
    }
}
    