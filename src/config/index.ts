import 'dotenv/config'

export const config: any = {
    dbConfig: {
        type: "postgres",
        host: "ec2-34-247-72-29.eu-west-1.compute.amazonaws.com",
        username: "hutxjuqrogykqe",
        password: "9b0e79e3ff5b0efdf30ed49541e354fa479af9a808dc1d30d9330dcb23c17b26",
        database: "dfoldmvtmvm5tc",
        port: 5432,
    },
    port: 3000,
    token_secret: "secret"
}