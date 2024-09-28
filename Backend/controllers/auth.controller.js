import User from "../models/user.models.js";
import bcrypt from 'bcryptjs'
import generateTokenandsetCookie from "../utils/generateToken.js";

// SignUp
export const signup = async (req,res)=>{
    try {
        const {fullname,username, password,confirmpassword,gender} = req.body;

        if(password!=confirmpassword){
            return res.status(400).json({error:"password and confirm password donot match"})
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"user already exists"})
        }

        //Hashing the password using bcrypt hashing
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password,salt);

        const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username={username}`
        const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username={username}`

        const newuser = new User({
            fullname,
            username,
            password:hashedpass,
            gender,
            profilepic: gender==='male'? boyprofilepic:girlprofilepic
        })
        
        if(newuser){
            await newuser.save()

            generateTokenandsetCookie(newuser._id,res)
        
            return res.status(201).json({
            _id:newuser._id,
            fullname: newuser.fullname,
            gender:newuser.gender,
            profilepic:newuser.profilepic
             })
        }
        else{
            return res.status(400).json({error:"Invalid details"})
        }


        
    } catch (error) {
        console.log("Error occured in signup",error)
    }
}

// Login 
// password validation needs to be rechecked

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const newUser = await User.findOne({ username });
        if (!newUser) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }

        const isPass = await bcrypt.compare(password, newUser.password);
        if (!isPass) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }

        console.log("User successfully logged in");
        generateTokenandsetCookie(newUser._id, res);

        return res.status(200).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            gender: newUser.gender,
            profilepic: newUser.profilepic
        });
    } catch (error) {
        console.log("Error occurred in login", error);
        return res.status(500).json({ error: "An error occurred while logging in" });
    }
};
// Logout

export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Loggedout successfully"})
    } catch (error) {
        console.log("Error occurred in logout", error);
        return res.status(500).json({ error: "An error occurred while logging out" });
    }
}