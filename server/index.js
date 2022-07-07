import { serverApp } from './app.js';
import dotenv from 'dotenv';

// get .env-file
dotenv.config();

// start multiple instances?
const PORT1 = process.env.LOADTEST_PORT1;
const PORT2 = process.env.LOADTEST_PORT2;
const PORT3 = process.env.LOADTEST_PORT3;
const PORT4 = process.env.LOADTEST_PORT4;
const PORT5 = process.env.LOADTEST_PORT5;

// no enviroment-variable set at all?
if ( PORT1 == undefined ) throw new Error("Atleast one LOADTEST_PORT1*-enviroment is required ( max 5 ports)");

// start instance(s)
serverApp(PORT1);

// any more? ( optional )
if (PORT2 != undefined) serverApp(PORT2);
if (PORT3 != undefined) serverApp(PORT3);
if (PORT4 != undefined) serverApp(PORT4);
if (PORT5 != undefined) serverApp(PORT5);