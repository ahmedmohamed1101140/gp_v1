//require the model

var UserController = {};

UserController.get_all_users = function(req,res,next){
    res.render("index");
}


module.exports = UserController;