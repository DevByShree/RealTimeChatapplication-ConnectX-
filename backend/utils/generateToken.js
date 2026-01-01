import jwt from "jsonwebtoken";

const generateTokenSetCookie = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax",   // 🔥 browser allow karta hai
    secure: false,    // 🔥 localhost ke liye false
    path: "/",        // 🔥 VERY IMPORTANT
  });
};

export default generateTokenSetCookie;
