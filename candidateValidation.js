
const {body, validatonResult, validationResult} = require('express-validator');

const candidateValidation =  () => {
    return  [
        body('name').trim().notEmpty().withMessage("name is required").bail().isAlpha().withMessage("only alphabetics are allowed"), 
        body('party').trim().notEmpty().withMessage("party name is required").bail().isAlpha().withMessage("only alphabetics are allowed"),
        body('age').trim().notEmpty().withMessage("age is required").bail().isNumeric().withMessage("only digits are allowed"),


        (req, res, next) => {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({Error: errors.array()})
            }
            next();
        }

    ]
};


module.exports = {
    candidateValidation,

}