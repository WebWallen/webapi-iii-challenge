const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
        .then(user => res.status(201).json(user)) // 201 for post req
        .catch(err => res.status(500).json({ message: 'Error adding user' }))
}); // 500 is a catch-all for failures that happen internally

router.get('/', (req, res) => {
    Users.get(req.query)
    .then(users => res.status(200).json(users)) // 200 for get req
    .catch(err => res.status(500).json({ message: 'Failed to get users' }))
});

router.get('/:id', validateUserId, (req, res) => {
    Users.getById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: 'Failed to get user' }))
});

router.get('/:id/posts', validateUserId, (req, res) => {
    Users.getUserPosts(req.params.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ message: 'Error fetching posts' }))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const postData = { ...req.body, user_id: req.params.id };

    Posts.insert(postData)
        .then(post => res.status(201).json(post))
        .catch(err => res.status(500).json({ message: 'Failed to add post' }))
})

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
    Users.getById(req.params.id)
    .then(user => {
        if (!user) {
            res.status(400).json({ message: 'No such ID' })
        } else {
            res.user = req.params.id;
            next();
        }
    })
    .catch(err => res.status(500).json({ message: 'Failed to validate ID' }))
};

function validateUser(req, res, next) {
    if (!req.body) res.status(400).json({ message: 'No user data' })
    else if (!req.body.name) res.status(400).json({ message: 'Missing name field' })
    next();
};

function validatePost(req, res, next) {
    if (!req.body.text) res.status(400).json({ message: 'No text typed!' })
    else next();
}

module.exports = router;
