import { User } from "../models/User"; // Adjust the import path to your User model

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      email: string;
      role: string;
      // Add other properties of your user object if needed
    }

    interface Request {
      user?: User; // Extend the Request type to include the user property
    }
  }
}