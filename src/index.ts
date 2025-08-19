import express from 'express';
import { database } from './database/connection';
import { areaRoutes } from './routes/areaRoutes';
import { processRoutes } from './routes/processRoutes';
import { subProcessRoutes } from './routes/subProcessRoutes';

const app = express();

app.use(express.json());

const startServer = async () => {
  try {
    await database.connect();

    app.use('/areas', areaRoutes);

    app.use('/processes', processRoutes);

    app.use('/subProcesses', subProcessRoutes);
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
