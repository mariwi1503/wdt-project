import { pipeline } from "stream"

export const Otp = {
    GenerateToken: (digit) => {
        // genreate 4 random digit
        let code = []
        for(let i=0; i< digit; i++) {
            let number = Math.floor(Math.random() * 9) + 1
            code.push(number)
        }
        return code.join('')
    }
}