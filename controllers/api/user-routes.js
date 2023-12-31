const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    //setting the loggedIn variable, and assigning a user variable in the session to the username provided by the user
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = req.body.username;
      res.status(200).redirect('/');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//dashboard route
router.get('/dashboard', async (req, res) => {
    try {
      if (!req.session.loggedIn) {
        res.redirect('/signup')
      } else {
        const blogData = await Blog.findAll({
          where: [{ 
            user_id: req.session.user
          },],
          include: [
            {
              model: Comment,
              attributes: ['user_name', 'comment_content', 'blog_id', ['created_at', 'createdAt']],
            },]
        });
        
        if (!blogData) {
          res.status(404).json({ message: 'No Blogs found!' });
          return;
        }
        const blogs = blogData.map((blog) => blog.get({ plain:true }))
        res.render('dashboard', { blogs, loggedIn: req.session.loggedIn })
      }
      } catch (err) {
        res.status(500).json(err);
      }
});

// Login
router.post('/login', async (req, res) => {
    //find user by username
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    //username validation - an alert will be posted upon failed login, logic in front end script
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }
    //password validation via User model method
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }
    //upon validation, save session and set session variables
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = req.body.username;
      //backend response. On the front end, the user is redirected to the home page.
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
//wildcard route
router.get('/*', (req, res) => {
  res.status(404).render('404');
});

module.exports = router;
