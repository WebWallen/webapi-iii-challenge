const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
    Posts.get(req.query)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ message: 'Failed to get posts' }))
});

router.get('/:id', validatePostId, (req, res) => {
    Posts.getById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ message: 'Failed to get post' }))
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
    Posts.getById(req.params.id)
    .then(post => {
        if (!post) {
            res.status(400).json({ message: 'No such post' })
        } else {
            res.post = req.params.id;
            next();
        }
    })
    .catch(err => res.status(500).json({ message: 'Failed to validate post' }))
};

module.exports = router;