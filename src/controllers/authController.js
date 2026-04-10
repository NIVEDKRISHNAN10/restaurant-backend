const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("../app");

// REGISTER (Admin or Worker)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
      if (!password || password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters"
    });
}

    const hashedPassword = await bcrypt.hash(password, 10);
    

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });
    

    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({ message: "User registered successfully", token, role: user.role });

  } catch (error) {
    res.status(500).json({status:false, error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};