const User = require('../models/user'); // Use capital 'U' for model naming convention
const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken');

async function handleRegisterUser(req, res) {
    const { username, email, password, dob, mobile } = req.body;

    console.log(req.body);
    // Check for required fields
    if (!username || !email || !password || !dob || !mobile) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
            dob,
            mobile,
            profilePicture:req.file.buffer,
        });

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Failed to register user" });
    }
}


async function handleLoginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
}


module.exports = {
    handleRegisterUser,
    handleLoginUser
}
