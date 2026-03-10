import { Sequelize } from "sequelize";

const databaseConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql'
}

console.log(databaseConfig)

const sequelize = new Sequelize(
    databaseConfig.database, databaseConfig.username, databaseConfig.password,
    {
        host: databaseConfig.host,
        dialect: databaseConfig.dialect,
        port: databaseConfig.port
    }
);

export const connectToDatabase = async () => {
    try {
    await sequelize.authenticate();
    console.log('连接成功')
} catch (error) {
    console.error('连接失败', error);
}
}


export default sequelize;