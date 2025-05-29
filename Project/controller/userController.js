import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utilities/jwtToken.js"

// -----PATIENT REGISTER-----

export const patientRegister = catchAsyncErrors(async(req, res, next) => {
    const {
        firstName, 
        lastName, 
        email, 
        phone, 
        nic, 
        dob, 
        gender, 
        password,
        confirmPassword,
    } = req.body;
    if(!firstName ||  !lastName || !email || !phone || !nic || !dob || !gender || !password || !confirmPassword){
        return next(new ErrorHandler("Please fill in all fields", 400));
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("Email already in use", 400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Passwords Do Not match"), 400);
    }
    user = await User.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        nic, 
        dob, 
        gender, 
        password,
        role: "Patient",
    });

    generateToken(user, "User Registered", 200, res);
});

// -----LOGIN-----

export const login = catchAsyncErrors(async(req, res, next) => {
    const {email, password, role} = req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    if(role !== user.role){
        return next(new ErrorHandler("You are not authorized to access this page", 400));
    }
    
    generateToken(user, "User Logged In Successfully!", 200, res);
});

// -----ADD NEW ADMIN-----

export const addNewAdmin = catchAsyncErrors(async(req, res, next) => {
    const {
        firstName, 
        lastName, 
        email, 
        phone, 
        nic, 
        dob, 
        gender, 
        password,
        confirmPassword,
    } = req.body;

    if(!firstName ||  !lastName || !email || !phone || !nic || !dob || !gender || !password || !confirmPassword){
        return next(new ErrorHandler("Please fill in all fields", 400));
    }

    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler("Email is already registered", 400));
    }
    const user = await User.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        nic, 
        dob, 
        gender, 
        password,
        role: "Admin",
    });
    generateToken(user, "New Admin registered!", 200, res);
});

// -----GET ALL DOCTORS-----

export const getAllDoctors = catchAsyncErrors(async(req, res, next)=>{
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors
    });
});

// -----GET USER DETAILS-----

export const getUserDetails = catchAsyncErrors(async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});