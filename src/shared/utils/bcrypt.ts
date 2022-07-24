import * as bcrypt from 'bcrypt'

let saltRound: number = 10

export function HashPassword(password: string): string {
    return bcrypt.hashSync(password, saltRound);
}

export function ValidatePassword(password: string, hashed: string): boolean {
    return bcrypt.compareSync(password, hashed);
}