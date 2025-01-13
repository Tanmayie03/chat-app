import User from "../models/userModal.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import cloudinary from "../cloudinary.js";

export const signup = async (req, res) => {
  const body = req.body;

  try {
    if (body.password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    const user = await User.findOne({
      email: body.email,
      password: body.password,
    });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = new User({
      fullName: body.fullName,
      email: body.email,
      password: hashedPassword,
      profilePic: body.profilePic,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        message: "User created successfully",
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error message ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const body = req.body;
  try {
    const user = await User.findOne({
      email: body.email,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPassCorrect = await bcrypt.compare(body.password, user.password);
    if (!isPassCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      message: "Login successful",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "");
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Error while logout ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic required" });
    }

    const upload = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: upload.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
