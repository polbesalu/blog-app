import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://polbesalu:ZLDD5aYPMnRCg0H0@blogappcluster.pkqbd.mongodb.net/?retryWrites=true&w=majority&appName=BlogAppCluster");

const handler = NextAuth({
  secret: "yvneSuNxg+/2dxSDH0FbLSPg/RL0cyJrx8cN5YpPhiU=",
  providers: [
    GoogleProvider({
      clientId: "1006215771331-od9nsjmabts9u49h65o9blf0irb534jo.apps.googleusercontent.com" ?? "",
      clientSecret: "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" ?? "",
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID ?? "",
      clientSecret: process.env.APPLE_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await client.connect();
          const db = client.db();
          const collection = db.collection("users");

          const user = await collection.findOne({ email: credentials!.email });

          if (user && bcrypt.compareSync(credentials!.password, user.hashedPassword)) {
            return { id: user._id.toString(), name: user.name, email: user.email };
          }

          return null;  
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        } finally {
          await client.close(); 
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
