import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { parse } from 'url';
import dotenv from 'dotenv';
import next from 'next';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import typeDefs from './backend/graphql/typeDefs';
import resolvers from './backend/graphql/resolvers';
import { userAuthed } from './backend/routes';


dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = express();
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // Initialize Next.js
    const nextApp = next({ dev });
    const nextHandler = nextApp.getRequestHandler();

    // Prepare Next.js app
    await nextApp.prepare();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Custom Express routes
    app.use('/api/user', userAuthed);

    // Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app, path: process.env.GRAPHQL});

    // Handle all other requests with Next.js
    app.all('*', (req: Request, res: Response) => {
      const parsedUrl = parse(req.url, true);
      return nextHandler(req, res, parsedUrl);
    });

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`>🚀 Ready on ${process.env.SERVER_URL}`);;
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.stack);
    } else {
      console.error('Unknown error:', err);
    }
    process.exit(1);
  }
};

// Connect to the MongoDB database
const dbUri = process.env.DATABASE_URI;
if (!dbUri) {
  console.error('DATABASE_URI is not defined');
  process.exit(1);
}

mongoose.connect(dbUri)
  .then(() => {
    console.log('Connected to the database');
    start();
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
