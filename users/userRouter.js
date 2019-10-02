const express = require('express');

const Users = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
    Users.insert(req.body)
        .then(user => res.status(201).json(user)) // 201 for post req
        .catch(err => res.status(500).json({ message: 'Error adding user' }))
}); // 500 is a catch-all for failures that happen internally

// router.post('/:id/posts', (req, res) => {

// });

router.get('/', (req, res) => {
    Users.get(req.query)
    .then(users => res.status(200).json(users)) // 200 for get req
    .catch(err => res.status(500).json({ message: 'Failed to get users' }))
});

router.get('/:id', (req, res) => {
    Users.getById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: 'Failed to get user' }))
});

// router.get('/:id/posts', (req, res) => {

// });

router.delete('/:id', (req, res) => {
    Users.remove(req.params.id)
    .then(user => res.status(200).json({ message: 'Boom, gone!' }))
    .catch(err => res.status(500).json({ message: 'Failed to delete' }))
});

router.put('/:id', (req, res) => {
    Users.update(req.params.id, req.body) // first arg = user ID and second = update string
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: 'Failed to update' }))
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

module.exports = router;
