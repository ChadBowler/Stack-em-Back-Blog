const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

// get all Blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ 
        model: User
      }]
    });
    if (!blogData) {
      res.status(404).render('404');
      return;
    }
    res.status(200).render('blog', { blogData, loggedIn: req.session.loggedIn })
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one Blog
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ 
        model: User
      },
      {//get comments associated with this blog. Set created_at to createdAt due to a bug getting the date to work
        model: Comment,
        attributes: ['user_name', 'comment_content', 'blog_id', ['created_at', 'createdAt']],
       }]
    });
    if (!blogData) {
      res.status(404).render('404');
      return;
    }
    const blog = blogData.get({ plain: true});
    res.status(200).render('blog', { blog, loggedIn: req.session.loggedIn })
  } catch (err) {
    res.status(500).json(err);
  }
});

// get update blog page (this is to render the page, which is not the same as doing a PUT request)
router.get('/update/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ 
        model: User
      },
      {//get comments associated with this blog. Set created_at to createdAt due to a bug getting the date to work
        model: Comment,
        attributes: ['user_name', 'comment_content', 'blog_id', ['created_at', 'createdAt']],
       }]
    });
    if (!blogData) {
      res.status(404).render('404');
      return;
    }
    const blog = blogData.get({ plain: true});
    res.status(200).render('blog-update', { blog, loggedIn: req.session.loggedIn })
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new Blog
router.post('/', async (req, res) => {
    try {
        //check for a current session before posting new blog
        if (!req.session.loggedIn) {
            res.status(400).json({ message: 'Please log in first'})
        } else {
            const blog = await Blog.create({
                title: req.body.title,
                content: req.body.content,
                //set the user_id to the current session user
                user_id: req.session.user
            });
            res.status(201).redirect('/')
        };
    } catch (err) {
        res.status(400).json(err)
    };
});

// update Blog
router.put('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
          include: [{ 
            model: User
          }]
        });
        //run checks to make sure there is a current session, the blog can be found, and the user is the owner of the blog
        if (!req.session.loggedIn) {
          res.status(400).json({ message: 'You must be logged in to update a blog'});
          return;
        } else if (!blogData) {
            res.status(404).json({ message: 'No Blog found with that id!' });
        } else if (req.session.user !== blogData.user_id) {
            res.status(400).json({ message: 'You must be the owner of this blog to update it'})
        } else {
            blogData.update({
                title: req.body.title,
                content: req.body.content
            });
            res.status(200).json(blogData);
        };
      } catch (err) {
        res.status(500).json(err);
      };
});
//delete blog
router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
          include: [{ 
            model: User
          },]
        });
        //run checks to make sure there is a current session, the blog can be found, and the user is the owner of the blog
        if (!req.session.loggedIn) {
          res.status(400).json({ message: 'You must be logged in to delete a blog'});
          return;
        } else if (!blogData) {
            res.status(404).json({ message: 'No Blog found with that id!' });
        } else if (req.session.user !== blogData.user_id) {
            res.status(400).json({ message: 'You must be the owner of this blog to delete it'})
        } else {
            blogData.destroy();
            res.status(200).json( { message: 'Blog successfully deleted'})
        };
      } catch (err) {
        res.status(500).json(err);
      };
});
//wildcard route just in case
router.get('/*', (req, res) => {
  res.status(404).render('404');
});

module.exports = router;
