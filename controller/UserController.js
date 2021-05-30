const express = require('express');
const { UserModel } = require('../model');
const { uuid } = require('uuidv4');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now().toString());
    next();
})

router.post('/register', 
    body('name').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('repassword').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Password do not match.');
            return false;
        }
        return true;
    }), 
    async function(req, res) {
        const { email, name, password, gender } = req.body;
        const newUser = {
            id: uuid(),
            email: email,
            name: name,
            password: password,
            gender: gender
        }
        try {
            await UserModel.insertUser(newUser);
            res.redirect('/');
        } catch(error) {
            console.log(error);
            res.status(500);
        }
})

router.post('/login', 
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty().trim(),
    async function(req, res) {
        const { email, password } = req.body;
        console.log(req.body);
        try {
            const user = await UserModel.findUserByEmail(email);
            console.log(user);
            console.log(user['password']);
            console.log(password);
            console.log(user.password === password);
            if (!user || user.password !== password) {
                return res.status(400).send({
                    message: 'Username or password incorrect.'
                });
            }
            req.session.loggedIn = true;
            req.session.userID = user.id;
            res.redirect('../')
        } catch(error) {
            console.log(error);
            res.status(500);
        }
})

module.exports = router