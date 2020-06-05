const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated } = require('../helpers/auth');

// Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Idea Index Page
router.get('/', ensureAuthenticated, (req, res) => {
  Idea.find({})
    .sort({ date: 'desc' })
    .then((ideas) => {
      res.render('ideas/index', {
        ideas,
      });
    });
});

// Add Idea Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('ideas/add');
});

// Edit Idea Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id,
  }).then((idea) => res.render('ideas/edit', { idea }));
});

// Process "Add Idea"-Form requests
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!req.body.details) {
    errors.push({ text: 'Please add some details text' });
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details,
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
    };
    new Idea(newUser).save().then((idea) => {
      req.flash('success_msg', 'Idea added');
      res.redirect('/ideas');
    });
  }
});

// Edit Form process
router.put('/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id,
  }).then((idea) => {
    // new values
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save().then((idea) => {
      req.flash('success_msg', 'Idea updated');
      res.redirect('/ideas');
    });
  });
});

// Delete idea
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Idea.deleteOne({ _id: req.params.id }).then(() => {
    req.flash('error_msg', 'Idea removed');
    res.redirect('/ideas');
  });
});

module.exports = router;
