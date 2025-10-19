import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import dotenv from "dotenv";

import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// Connect MongoDB
await connectDB();

// ⚡ Important: Apply middleware in this order
app.use(cors());        // 1. CORS
app.use(express.json()); // 2. JSON parser

// Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

// 3. Apollo middleware after JSON parsing
app.use("/graphql", expressMiddleware(server));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`));
