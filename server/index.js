import { serverApp } from './app.js';
import dotenv from 'dotenv';
import cluster from 'cluster';

// get .env-file
dotenv.config();

if ( cluster.isPrimary) {
    const instances = process.env.CLUSTER_INSTANCES || 1;

    // fork instances
    console.log(`Number of instances to start is ${instances}`);
    console.log(`Master ${process.pid} is running`);
   
    // Fork workers.
    for (let i = 0; i < instances; i++) {
      const worker = cluster.fork();

      worker.on("exit", (code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
      });

    }

} else {
    // start server instance
    serverApp(process.env.PORT);
}