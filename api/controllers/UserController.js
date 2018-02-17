//require the model

var UserController = {};

UserController.get_all_users = function(req,res,next){
    res.send("hi Api Users From Controller");
}


module.exports = UserController;