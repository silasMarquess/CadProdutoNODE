require('dotenv').config();

const environments = [
    'DB_USER',
    'DB_PASSWORD',
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'NODE_PORT_LOCAL',
    'NODE_PORT_DOCKER',
    'MONGO_PORT_LOCAL',
    'MONGO_PORT_DOCKER',
]

environments.forEach((nome) => {
    if (!process.env[nome]) throw new Error(`Variavel de ambiente não definida: ${process.env.nome}`);
})

module.exports = {
    dbArgs : [
        DB_USER =process.env.DB_USER,
        DB_PASSWORD =process.env.DB_PASSWORD,
        DB_HOST =process.env.DB_HOST,
        DB_PORT =process.env.DB_PORT,
        DB_NAME =process.env.DB_NAME,
    ],
    NODE_PORT_LOCAL:process.env.NODE_PORT_LOCAL,
    NODE_PORT_DOCKER:process.env.NODE_PORT_DOCKER,
    MONGO_PORT_DOCKER:process.env.MONGO_PORT_DOCKER,
    MONGO_PORT_LOCAL:process.env.MONGO_PORT_LOCAL
}
