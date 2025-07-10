import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utilities/jwtToken.js"
import cloudinary from "cloudinary"

// -----PATIENT REGISTER-----

export const patientRegister = catchAsyncErrors(async(req, res, next) => {
    const {
        firstName, 
        lastName, 
        email, 
        phone, 
        dob, 
        gender, 
        password,
        confirmPassword,
    } = req.body;
    if(!firstName ||  !lastName || !email || !phone || !dob || !gender || !password || !confirmPassword){
        return next(new ErrorHandler("Please fill in all fields", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`Email is already registered as ${isRegistered.role}!`, 400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Passwords Do Not match"), 400);
    }
    const user = await User.create({
        firstName, 
        lastName, 
        email, 
        phone, 
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
    if(!email || !password){
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    if(user.role !== role){
        return next(new ErrorHandler(`You are not registered as ${role}!`, 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password", 400));
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
        dob, 
        gender, 
        password,
        confirmPassword,
    } = req.body;

    if(!firstName ||  !lastName || !email || !phone || !dob || !gender || !password || !confirmPassword){
        return next(new ErrorHandler("Please fill in all fields", 400));
    }

    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`Email is already registered as ${isRegistered.role}!`, 400));
    }
    const user = await User.create({
        firstName, 
        lastName, 
        email, 
        phone, 
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

// -----LOGOUT-----

export const logoutAdmin = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin Logged out successfully"
    });
});

export const logoutPatient = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Patient Logged out successfully"
    });
});

// -----ADD NEW DOCTORS-----

export const addNewDoctor = catchAsyncErrors(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Please upload a profile picture!", 400));
    }

    const {docAvatar} = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format not supported!", 400));
    }

    const {
        firstName, 
        lastName, 
        email, 
        phone, 
        dob, 
        gender, 
        password,
        confirmPassword,
        doctorDepartment,
    } = req.body;
    if(!firstName ||  !lastName || !email || !phone || !dob || !gender || !password || !confirmPassword || !doctorDepartment){
        return next(new ErrorHandler("Please fill in all fields", 400));
    }

    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`Email is already registered as ${isRegistered.role}!`, 400));
    }

    if(password !== confirmPassword){
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath, 
    )
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown error uploading image to Cloudinary"
        );
    }

    const doctor = await User.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        dob, 
        gender, 
        password,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "New Doctor registered successfully!",
        doctor,
    });
});
