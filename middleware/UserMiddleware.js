var middlewareObj = {};

middlewareObj.fun1 = function(req,res,next){
    console.log("Iam here in the middelware");
    next();
}

module.exports = middlewareObj;