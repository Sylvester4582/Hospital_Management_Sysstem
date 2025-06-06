export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
    res.status(statusCode).cookie(cookieName, token, {
        httpOnly: true,
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 1000
        ), 
    }).json({
        success: true,
        message: message,
        user,
        token,
    })
}