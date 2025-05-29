import {catchAsyncErrors} from "../middelwares/catchAsyncErrors.js"
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async(req, res, next) => {
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Request Body:", req.body);

    const { firstName, lastName, email, phone, message } = req.body;
    if(!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({ 
            success: false,
            message: "Please fill all the fields" 
        });
    }
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
        success: true,
        message: "Message Sent!",
    });
});