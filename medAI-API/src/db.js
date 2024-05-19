import { connect } from 'mongoose';
import { MONGODB_URI } from './config';

export const connectDB = async () => {
    try {
        await connect(MONGODB_URI, {
            dbName: 'medAI'
        });
        console.log(`Connected to database: medAI`);
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
};
