module.exports = app => {
    const news = require("../controllers/newsController.js");
    const router = require("express").Router();

    // Create a new News
    router.post("/create", news.create);

    // Retrieve all News
    router.get("/", news.findAll);

    // Retrieve a single News with id
    router.get("/:id", news.findOne);

    // Update a News with id
    router.put("/update/:id", news.update);

    // Delete a News with id
    router.delete("/:id", news.delete);




    app.use('/news', router);
};