module.exports = app => {
    const users = require("../controllers/userController.js");



    const router = require("express").Router();

    // Create a new User
    router.post("/signup", users.create);

    router.post("/signin", users.login);

    router.get("/logout/:id", users.logout);

    router.get("/refresh/:id", users.refreshTokens);

    app.use('/users', router);
};


