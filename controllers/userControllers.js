const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSignup = async ( req, res) => {
        const {cnic, password, role, ...rest} = req.body;
        // console.log(req.body);

        // let existingUser; 

        try {

            const adminUser = await User.findOne({role: 'admin'});
            if(role === 'admin' && adminUser){
                return res.status(400).json({message: "admin user already exists"});
            }
           const existingUser = await User.findOne({cnic})
            // console.log(existingUser);

            if(existingUser){
                return res.status(400).json({message: "user already registered"})
            }
            const hash = bcrypt.hashSync(password);
    
            const newUser = new User({
                cnic,
                password: hash,
                ...rest
            });
    
            
            const response = await newUser.save();
            response.password = undefined;
            res.status(201).json({response: response});

        } catch (error) {
            console.error(error);
            res.status(500).json({message: "failed to save user data"});
        }
        
        
        
};

const userLogin = async (req, res) => {
    const {cnic, password} = req.body

    const existingUser = await User.findOne({cnic})
    
    if(!existingUser){
        return res.status(404).json({message: "user not found"})
    }
    // console.log(typeof password, typeof existingUser.password);

    const isPassword = bcrypt.compareSync(password, existingUser.password)

    if(!isPassword){
       return res.status(404).json({message: "password do not match"})
    }
    const payLoad = {
        id: existingUser.id
    }
    const token = jwt.sign(payLoad, process.env.SECRET, {expiresIn: '4h'})

    return res.status(200).json({message: "login successfully",token: token});
}

const userProfile = async (req, res) => {
    
    const userId = req.user.id;
    
    try {
            const userData = await User.findById(userId);
            
            res.status(200).json(userData);
        } catch (error) {
            return res.status(500).json(error);
        }
};

const updatePassword = async (req, res) => {
        const userId = req.user.id;
        const {currentPassword, newPassword} = req.body

        try {
            const userData = await User.findById(userId);

            const isPassword = bcrypt.compareSync(currentPassword, userData.password);
            if(!isPassword){
               return res.status(401).json({message: "invalid current password"});
            }
            const hashedNewPassword = bcrypt.hashSync(newPassword);
            userData.password = hashedNewPassword;

            await userData.save();

            res.status(200).json({message: "password updated successfully"})


            
        } catch (error) {
            console.log(error);
        }
}




module.exports = {
    userSignup,
    userLogin,
    userProfile,
    updatePassword,
}