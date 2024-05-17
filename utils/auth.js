import Users from "../models/user.js";
import bcrypt from 'bcrypt';


class Authenticate {
  async registerUser(req, role, res) {
    const { email, username, password } = req.body;

    const usernameAvailable = await validateData(username);
    if (!usernameAvailable) {
      return res.status(404).json({
        message: "User name is already taken",
        success: false,
      });
    }

    const emailAvailable = await validateData(email);
    if (!emailAvailable) {
      return res.status(404).json({
        message: "Email is already registered to a different user",
        success: false,
      });
    }

    const hash_password = await bcrypt.hash(password, 12);

    const newUser = new Users({
      ...req.body,
      password: hash_password,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      message: "user registered successfully",
      success: true,
    });
  }
}

const validateData = async (data) => {
  const user = await Users.findOne({ data });
  return user ? true : false;
};

const Auth = new Authenticate()

export default Auth;
