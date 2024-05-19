import {config} from 'dotenv';
config();

export const MONGODB_URI =  process.env.MONGODB_URI;
export const ACCOUNT_NAME = process.env.ACCOUNT_NAME;
export const SAS_TOKEN = process.env.SAS_TOKEN;
export const CONTAINER_NAME = process.env.CONTAINER_NAME;

