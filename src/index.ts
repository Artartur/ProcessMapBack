import express from 'express';
import { database } from './database/connection';
import { areaRoutes } from './routes/areaRoutes';

const app = express();

app.use(express.json());

const startServer = async () => {
  try {
    await database.connect();

    app.use('/areas', areaRoutes);
  } catch (error) {
    console.error("Error starting the server: ", error);
    process.exit(1);
  }
}

startServer();

process.on('SIGINT', async () => {
  console.log('\n We are finishing the aplicattion...');
  await database.close();
  process.exit(0);
});
