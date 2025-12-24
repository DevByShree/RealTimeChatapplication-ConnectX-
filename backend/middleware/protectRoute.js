import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';


const protectRoute =async (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized  no token " });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized  invalid  token " });

        }
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){

            return res.status(401).json({error :" user not found"})
        }

        req.user = user

        // from databse data fetch and come to that user 
        next();

    }
    catch (error) {
        console.log("ProtectRoute error:", error.message);
        res.status(500).json({ error: "the error was found in protect routes " })
    }

}

export default protectRoute;


// req from server then message routhe {protectroute} =>> then if the protect route condition stastify then continue with snedMessage 