import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id, name) => {
    return jwt.sign({ id, name }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        console.log('Signup request received:', { name, email, hasPassword: !!password });


        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }


        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email',
            });
        }


        console.log('Creating new user...');
        const user = await User.create({
            name,
            email,
            password,
        });
        console.log('User created successfully:', user._id);


        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not set in environment variables!');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error',
            });
        }


        const token = generateToken(user._id, user.name);
        console.log('Token generated successfully');

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                token,
                userId: user._id.toString(),
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Signup error:', error);
        

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', '),
            });
        }
        

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email',
            });
        }
        

        res.status(500).json({
            success: false,
            message: error.message || 'Server error during signup',
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }


        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }


        const token = generateToken(user._id, user.name);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                userId: user._id.toString(),
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
        });
    }
};
