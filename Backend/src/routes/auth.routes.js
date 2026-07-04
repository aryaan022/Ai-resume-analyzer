const {Router}=require("express");
const {registerUserController,loginUserController,logoutUserController,getMeController}=require("../controllers/auth.controller.js")
const authMiddleware=require("../middlewares/auth.middleware.js")
const authRouter= Router();



authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.get("/logout", logoutUserController);
authRouter.get("/get-me",authMiddleware.authUser,getMeController);


module.exports=authRouter;