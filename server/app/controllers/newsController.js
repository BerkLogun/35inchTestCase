const db = require('../models');
const News = db.news;
const Op = db.Sequelize.Op;

// Create and Save a new News

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a News
    const news = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        image: req.body.image
    };

    // Save News in the database
    News.create(news)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).json({message: err.message});
            
        });
}

// Retrieve all News from the database.

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    News.findAll({where: condition})
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).json({message: err.message});
            
        });
}

// Find a single News with an id

exports.findOne = (req, res) => {
    const id = req.params.id;

    News.findByPk(id)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).json({message: err.message});
            
        });
}

// Update a News by the id in the request

exports.update = (req, res) => {
    const id = req.params.id;

    News.update(req.body, {where: {id: id}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "News was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update News with id=${id}. Maybe News was not found`
                });
            }
        }).catch(err => {
            res.status(500).json({message: err.message});
            
        });
}

// Delete a News with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;

    News.destroy({where: {id: id}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Selected News was successfully deleted!"
                });
            } else {
                res.send({
                    message: `Cannot delete News with id=${id}. Maybe News was not found!`
                });
            }
        }).catch(err => {
            res.status(500).json({message: err.message});
            
        });
}
