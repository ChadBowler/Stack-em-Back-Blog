const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: Comment,
          attributes: ['user_name', 'comment_content', 'blog_id'],
        },
      ],
    });

    const blogs = blogData.map((blog) =>
      blog.get({ plain: true })
    );
    res.render('homepage', {blogs, loggedIn: req.session.loggedIn});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//signup route
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signup');
  });

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
