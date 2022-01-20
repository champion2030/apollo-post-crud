import express from "express";
import { error, success } from 'consola'
import { config } from './src/config'
import {ApolloServer, gql} from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import * as http from "http";
import typeDefs from "./src/graphql/typeDefs";
import resolvers from "./src/graphql/resolvers";
import mongoose from "mongoose";
import * as AppModels from './src/models'

const startApolloServer = async (typeDefs, resolvers) => {
    try {
        await mongoose.connect(`mongodb://${config.database.host}:${config.database.port}/`, {
            bufferCommands: false,
            dbName: config.database.name,
            user: config.database.username,
            pass: config.database.password,
            autoIndex: true,
            autoCreate: true,
        });
        success({
            badge: true,
            message: `Successfully connected to DB`,
        })
        const app = express();
        const httpServer = http.createServer(app);
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
            context: {...AppModels},
        });
        await server.start();
        server.applyMiddleware({ app });
        httpServer.listen(config.port, () => success({
            badge: true,
            message: `🚀Server started on PORT ${config.port}`,
        }));
    } catch (err) {
        error({
            badge: true,
            message: err.message,
        })
    }
}

startApolloServer(typeDefs, resolvers);
