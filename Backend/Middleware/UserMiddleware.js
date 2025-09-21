import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

const Authmiddleware = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      return res.status(401).json("You are unauthorized.");
    }

    const parts = authHeaders.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json("Unauthorized format.");
    }

    const token = parts[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json("User not found.");
    }

    req.user = user;

    next(); 
  } catch (err) {
    console.error(err);
    return res.status(401).json("Invalid or expired token.");
  }
};

export default Authmiddleware;
