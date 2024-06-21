// Create web server

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

// Submit a comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });

    try {
        const savedComment = await comment.save();
        res.json(savedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get a specific comment
router.get('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        res.json(comment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete a specific comment
router.delete('/:commentId', async (req, res) => {
    try {
        const removedComment = await Comment.remove({ _id: req.params.commentId });
        res.json(removedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update a specific comment
router.patch('/:commentId', async (req, res) => {
    try {
        const updatedComment = await Comment.updateOne(
            { _id: req.params.commentId },
            { $set: { comment: req.body.comment } }
        );
        res.json(updatedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;