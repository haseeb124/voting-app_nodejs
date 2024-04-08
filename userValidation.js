const {body, validationResult } = require('express-validator');

const userRegisterValidator = () => {
    return [
        body('name').trim().notEmpty().withMessage("name is required").bail()
        .custom((value) => {
            
            if(!/^[a-zA-Z0-9]+$/.test(value)){
                throw new Error("name must only contains alphabetics and numbers")
            }
            return true;
        }),
        body('password').trim().notEmpty().withMessage("password is required"),
        body('email').trim().notEmpty().withMessage("email is required").bail().isEmail().withMessage("invalid email format"),
        body('age').trim().notEmpty().withMessage("age is required").bail().isInt({min: 18}).withMessage("age must be atleast 18"),
        body('address').trim().notEmpty().withMessage("address is required").bail()
        .custom((value) => {

            if(!/^[a-zA-Z0-9\s&#,]+$/.test(value)){
                throw new Error("address must only contains alphabetics, numbers, comma and hash symbol")
            }
            return true;
        }),
        body('mobile').trim().notEmpty().withMessage("mobile number is required").bail().isMobilePhone().withMessage("invalid mobile number"),
        body('cnic').trim().notEmpty().withMessage("cnic is required").bail().isInt().withMessage("cnic must be a number"),

        (req , res, next ) => {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({Error: errors.array()});
            }

            next();
        }
        
    ]
};

const userLoginValidator = () => {
    return [
        body('cnic').trim().notEmpty().withMessage("cnic is required").bail().isInt().withMessage("cnic must be a number"),
        body('password').trim().notEmpty().withMessage("password is required"), 
        

        (req , res, next ) => {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({Error: errors.array()});
            }

            next();
        }
        
    ]
};

const userPasswordValidator = () => {
    return [
        
        body('password').trim().notEmpty().withMessage("password is required"), 
        

        (req , res, next ) => {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({Error: errors.array()});
            }

            next();
        }
        
    ]
};

module.exports = {
    userRegisterValidator,
    userLoginValidator,
    userPasswordValidator
};