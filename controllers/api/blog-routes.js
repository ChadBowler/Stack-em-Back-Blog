const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

// get all Blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ 
        model: User
      },
    ]
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blogs found!' });
      return;
    }
    res.render('blog', blogData)
    // res.status(200).json(blogData);
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
      {//get comments associated with this blog
        model: Comment,
        where: {
            blog_id: req.params.id
        }
       }
    ]
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with that id!' });
      return;
    }
    const blog = blogData.get({ plain: true});
    res.render('blog', blog)
    // res.status(200).json(blogData);
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
            // res.redirect(`blogs/${blog.id}`)   
            res.status(200).json(blog)
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
          },
        ]
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

router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
          include: [{ 
            model: User
          },
        ]
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

module.exports = router;
