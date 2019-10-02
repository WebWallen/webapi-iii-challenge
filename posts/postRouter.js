const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePost(req, res, next) {

};

function validatePostId(req, res, next) {

};

module.exports = router;