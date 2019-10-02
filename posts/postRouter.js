const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', logger, (req, res) => {
    Posts.get(req.query)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ message: 'Failed to get posts' }))
});

router.get('/:id', logger, validatePostId, (req, res) => {
    Posts.getById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ message: 'Failed to get post' }))
});

router.delete('/:id', logger, validatePostId, (req, res) => {
    Posts.remove(req.params.id)
    .then(post => res.status(200).json({ message: 'Bye, baby!' }))
    .catch(err => res.status(500).json({ message: 'Failed to delete' }))
});

router.put('/:id', logger, validatePostId, (req, res) => {
    Posts.update(req.params.id, req.body)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ message: 'Failed to update' }))
});

// custom middleware

function logger(req, res, next) {
    console.log(`${req.method} to ${req.path}`)
    next();
  };

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