import * as dotenv from 'dotenv';
import convict from "convict";

dotenv.config();

const values = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'production',
        env: 'NODE_ENV',
        arg: 'node-env',
    },
    host: {
        default: 'localhost',
        env: 'APP_HOST',
        doc: 'Application host',
        format: String,
    },
    port: {
        default: 3000,
        env: 'APP_PORT',
        doc: 'Application port',
        format: Number,
    },
    logLevel: {
        default: 'debug',
        env: 'LOG_LEVEL',
        doc: 'Log level',
        format: String,
    },
    secret: {
        default: '1234567890',
        env: 'SECRET',
        doc: 'Secret',
        format: String,
    },
    database: {
        host: {
            default: 'localhost',
            env: 'DB_HOST',
            doc: 'Database host',
            format: String,
        },
        port: {
            default: 27017,
            env: 'DB_PORT',
            doc: 'Database port',
            format: Number,
        },
        username: {
            default: 'test',
            env: 'DB_USER',
            doc: 'Database username',
            format: String,
        },
        password: {
            default: 'test',
            env: 'DB_PASSWORD',
            doc: 'Database password',
            format: String,
        },
        name: {
            default: 'graphql_test',
            env: 'DB_NAME',
            doc: 'Database name',
            format: String,
        },
    },
});

values.validate({ allowed: 'strict' });

export const config = values.getProperties();
