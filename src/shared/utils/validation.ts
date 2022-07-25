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

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsPhoneNumber',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(input: any) {
                    let is_valid;
                    try { is_valid = /^(\+62|62|0)8[1-9][0-9]{6,9}$/ } catch {}
                    return is_valid
                }
            }
        })
    }
} 