import { User } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({email});
    if (user){
        return res.status(400).json({
            success: false,
            message: "User already exist with this email."
        })
    }
    await User.create({
        name,
        email,
        password
    })
  } catch (error) {}
};
