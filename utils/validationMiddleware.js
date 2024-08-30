// const { listingSchema } = require('../schema.js');  // Assuming you have a schema validation file
// const ExpressError = require('./ExpressError');
// module.exports = (req, res, next) => {
//     const { error } = listingSchema.validate(req.body);
//     if (error) {
//         const errMsg = error.details.map(el => el.message).join(',');
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// }
module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
        if(error) {
            let errMsg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400,errMsg);
        } else {
            next();
        }
};