const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login')
        } else {
            const blogData = await Blog.findByPk(req.params.id, {
                include: [
                  {
                    model: Comment,
                    attributes: [
                      'id',
                      'comment_content',
                      'user_name',
                      'blog_id',
                      ['created_at', 'createdAt']
                    ]
                  },
                ],
              });
              const blog = blogData.get({ plain: true });
              res.render('comment', {blog, loggedIn: req.session.loggedIn});
        }
    } catch (err) {
        res.status(400).json(err)
    }
});

// create new Comment
router.post('/:id', async (req, res) => {
    try {
        //check for a current session before posting new comment
        if (!req.session.loggedIn) {
            res.status(400).json({ message: 'Please log in first'})
        } else {
            const comment = await Comment.create({
                comment_content: req.body.comment_content,
                //set the user_id to the current session user
                user_name: req.session.user,
                blog_id: req.params.id
            });
            res.status(200).json(comment)
        };
    } catch (err) {
        res.status(400).json(err)
    };
});

module.exports = router;
