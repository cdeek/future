import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models";
import validator from "validator";
import { CustomError, errorHandler } from "../errorHandler";

const router = express.Router();

// JWT token creation
const createToken = (id: string): string => {
  return jwt.sign({ id }, process.env.SECRET as string, { expiresIn: "1d" });
};

// Login route
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const userEmail: string = email.toLowerCase();

    try {
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        throw new CustomError("Invalid credentials", 401);
      }

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        throw new CustomError("Invalid credentials", 401);
      }

      const token = createToken(user._id.toString());
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
 }
);

// Signup route
router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    try {
      if (!validator.isStrongPassword(password)) {
        throw new CustomError("Password is not strong enough", 400);
      }

      const userEmail: string = email.toLowerCase();
      const exist = await User.findOne({ email: userEmail });
      if (exist) {
        throw new CustomError("Email already exists, login", 400);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email: userEmail,
        password: hashedPassword,
        roles: ["customer"],
      });

      const token = createToken(user._id.toString());
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  }
);

// Get user route
router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
  const userToken = req.cookies.token;

  try {
    if (!userToken) {
      throw new CustomError("Unauthorized", 401);
    }

    const decoded = jwt.verify(userToken, process.env.SECRET as string) as {
      id: string;
    };
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new CustomError("Unauthorized", 401);
    }

    res.status(200).json({ token: userToken });
  } catch (error) {
    next(error);
  }
});

// Logout route
router.get(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("token", "", { maxAge: 1 });
      res.status(200).send("Logged out");
    } catch (error) {
      next(error); // Pass error to the middleware
    }
  },
);

// Use the customError middleware globally for handling
router.use(errorHandler);

export default router;
