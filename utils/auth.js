import Users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/index.js";

class Authenticate {
  async validateData(data) {
    const user = await Users.findOne({ data: data });
    return user ? false : true;
  }

  async registerUser(userCred, role, res) {
    try {
      const usernameAvailable = await this.validateData(userCred.username);
      if (!usernameAvailable) {
        return res.status(404).json({
          message: "User name is already taken",
          success: false,
        });
      }

      const emailAvailable = await this.validateData(userCred.email);
      if (!emailAvailable) {
        return res.status(404).json({
          message: "Email is already registered to a different user",
          success: false,
        });
      }

      const hash_password = await bcrypt.hash(userCred.password, 12);
      const newUser = new Users({
        ...userCred,
        password: hash_password,
        role,
      });

      await newUser.save();

      return res.status(201).json({
        message: "user registered successfully",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "user registered Unsuccessfully",
        success: false,
      });
    }
  }
  async loginUser(userCred, role, res) {
    const { email, password } = userCred;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    // check the user role
    if (user.role !== role) {
      return res.status(403).json({
        message: "Please make sure you are logging in with the right portal",
        success: false,
      });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      let payload = {
        user_id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      };

      let token = jwt.sign(payload, SECRET, { expiresIn: "5 days" });

      let result = {
        email: user.email,
        username: user.username,
        role: role,
        token: `Bearer ${token}`,
        user_id: user._id
      };

      return res.status(200).json({
        ...result,
        message: "Login successful",
        success: true,
      });

    } else {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }
  }
  
}

const Auth = new Authenticate();

export default Auth;
