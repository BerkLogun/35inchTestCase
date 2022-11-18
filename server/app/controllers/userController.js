const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Create and Save a new User

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Username can not be empty!"
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    
    try{
        const usern = req.body.username;
        const userExists = await User.findOne({where: {username: usern}});
        if(userExists){
            res.status(400).send({
                message: "Username already taken!"
            });
        }
            
    if(req.body.password != req.body.confirmPassword) {
        return res.status(400).json({message: "Passwords do not match"});
    }
    }catch(err){
        res.status(500).json({message: err.message});
    }

    // create accsess token 
    const accessToken = jwt.sign({
        email: req.body.email,
        admin: req.body.admin
    }, process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: '3m'
    });

    // create refresh token so we can refresh the access token
    const newRefreshToken = jwt.sign({
        email: req.body.email,
        admin: req.body.admin
    }, process.env.REFRESH_TOKEN_SECRET);

    // Create a User
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        admin: req.body.admin,
        refreshToken: newRefreshToken
    };

    

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send({data, accessToken});
        }).catch(err => {
            res.status(500).json({message: err.message});
            
        });



}


exports.logout = (req, res) => {
    try{
        const id = req.params.id;
        User.update({refreshToken: null}, {where: {id: id}})
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).json({message: err.message});
            
        });
    }catch (error) {
        res.status(500).json({message: err.message});
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({where: {email: email}});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({message: "Invalid password"});
        }


        const accessToken = jwt.sign({
            email: user.email,
            admin: user.admin
        }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '3m'
        });
        //res.json({accessToken: accessToken});
        
        const newRefreshToken = jwt.sign({
            email: user.email,
            admin: user.admin
        }, process.env.REFRESH_TOKEN_SECRET);

        await User.findOne({where: {email: email}})
        .then(data => {
            User.update({refreshToken: newRefreshToken}, {where: {email: email}})
            .then(data => {
                res.send(data);
            }).catch(err => {
                //res.status(500).json({message: err.message});
                
            });
        }).catch(err => {
            //res.status(500).json({message: err.message});
            
        });
        
        




        res.status(200).json({user, accessToken});

    }catch (err) {
        res.status(500).json({message: err.message});
    }

}


exports.refreshTokens = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findOne({where: {id: id}});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const refreshToken = user.refreshToken;
        if(refreshToken){
           // res.status(200).json({refreshToken});

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedRefreshToken) => {
                if(err){
                    return res.status(403).json({message: "Invalid refresh token"});
                }
                const accessToken = jwt.sign({
                    email: decodedRefreshToken.email,
                    admin: decodedRefreshToken.admin
                }, process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '3m'
                });
                res.status(200).json({accessToken});
                
            }
            );
        }
        

    }catch (err) {
        res.status(500).json({message: err.message});
    }
}
           


