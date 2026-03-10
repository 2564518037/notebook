import express from 'express';
import router from './router.js';
import cors from 'cors';
import sequelize from './sequelize/server.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('数据库已同步');
    app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
  } catch (error) {
    console.error('无法同步数据库:', error);
  }
}

syncDatabase();

