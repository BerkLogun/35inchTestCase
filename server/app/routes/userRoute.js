module.exports = app => {
    const users = require("../controllers/userController.js");
    const router = require("express").Router();

    // Create a new User
    router.post("/register", users.create);


    app.use('/users', router);
};
