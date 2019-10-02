const express = require('express');

const Users = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
    Users.insert(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ message: 'Error adding user' }))
});

// router.post('/:id/posts', (req, res) => {

// });

router.get('/', (req, res) => {
    Users.get(req.query)
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: 'Failed to get users' }))
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

module.exports = router;
