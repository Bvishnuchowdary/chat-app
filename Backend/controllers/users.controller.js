import User from "../models/user.models.js";

const getusersfromsidebar = async (req,res) =>{
    try {
        const loggedinuserid = req.user._id

        const filteredusers = await User.find({_id:{$ne:loggedinuserid}}).select("-password")

        res.status(200).json(filteredusers)


    } catch (error) {
        console.log("Error occurred in users.controller inside getusersfromsidebar", error);
        return res.status(500).json({ error: "An error occurred while looking for users from side bar" });
    }
}

export default getusersfromsidebar