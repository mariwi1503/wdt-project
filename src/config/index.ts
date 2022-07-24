import 'dotenv/config'

export const config: any = {
    dbConfig: {
        type: "postgres",
        host: "localhost",
        username: "postgres",
        password: "postgres",
        database: "dataku",
        port: 5432,
    },
    port: 3000,
    token_secret: "secret"
}