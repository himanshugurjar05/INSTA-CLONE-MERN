import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
  console.log("Signup backend hit..");
  try {
    const { name, email, password } = req.body;
    const photo = req.file?.path;

    if (!name || !email || !password) {
      return res.status(400).json("All Fields are required..");
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      photo,
      password: hashedpassword,
    });

    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        photo: user.photo,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Something Went Wrong..");
  }
};

export const Login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json("All fields are required.");
    }

    const user = await UserModel.findOne({ name });

    if (!user) {
      return res.status(404).json("User not found.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json("Invalid password.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        photo: user.photo,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Profile = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.json("Create an account first....");
    }
    return res.json(user);
  } catch (err) {
    console.error("Signup Error:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
