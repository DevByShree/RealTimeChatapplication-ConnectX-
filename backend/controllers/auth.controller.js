import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import generateTokenSetCookie from '../utils/generateToken.js';



// SIGNUP
export const signup = async (req, res) => {

    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password don't match" })
        }
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Uesrname is already exist broo!!" })
        }
        // HASH pawssword here check gt what is hashing 

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`


        // new user 
        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: gender == "male" ? boyProfilepic : girlProfilepic
        })

        // validation 

        if (newUser) {

            // generate a token 
            generateTokenSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                usrename: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.sattus(400).jsaon({ error: "Invalid user adta " });
        }
    }
    catch (error) {
        console.log("Error in singup controller", error.message);
        res.status(500).json({ err: "internal server isssue " });

    }

};
/// LOGIN 



export const login = async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        // if user and passs any of one is in correct then this 
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid ussername and password " });
        }

        generateTokenSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            usrename: user.username,
            profilePic: user.profilePic

        });

    }
    catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ err: "internal server isssue " });

    }
}


// LOGOUT 


export const logout = (req, res) => {
    
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logout successfully  "})

    }
    catch(error){
          console.log("Error in logout controller", error.message);
        res.status(500).json({ err: "internal server isssue " });


    }
}
