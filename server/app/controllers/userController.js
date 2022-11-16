const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User

exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).json({message: err.message});
            
        });
}

