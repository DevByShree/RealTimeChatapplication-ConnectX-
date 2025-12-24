import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {

    try {

        const loggedInUserId = req.user._id

        const filteredusers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")// Go to Users collection  Find all users Exclude the user whose _id is loggedInUserId  Store result in filteredUsers


        res.status(200).json(filteredusers)
    }
    catch (error) {
        console.log("The error found in the usre.controller!!", error.message);
        res.status(200).json({ error: "Inter server error " })
    }

}