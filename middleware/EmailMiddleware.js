const joi = require('joi');

var middlewareObj = {};
middlewareObj.validate_data = function(req,res,next){
    next();
}
module.exports = middlewareObj;