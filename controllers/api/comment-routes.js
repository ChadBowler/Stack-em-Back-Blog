const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');


// function logOriginalUrl (req, res, next) {
//     console.log('Request URL: ', req.logOriginalUrl)
//     next()
// }

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
                      'blog_id'
                    ]
                  },
                ],
              });
          
              const blog = blogData.get({ plain: true });
              // res.status(200).json(blog)
              res.render('comment', {blog, loggedIn: req.session.loggedIn});
        }
    } catch (err) {
        res.status(400).json(err)
    }
})

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
            // res.redirect(`blogs/${comment.blog_id}`)   
            res.status(200).json(comment)
        };
    } catch (err) {
        res.status(400).json(err)
    };
});

// update Comment
// router.put('/:id', async (req, res) => {

//     try {
//         const blogData = await Blog.findByPk(req.params.id, {
//           include: [{ 
//             model: User
//           },
//         //   {
//         //     model: Comment,
//         //     through: { attributes: [ 'id', 'user_name', 'blog_id' ]}
//         //    }
//         ]
//         });
//         //run checks to make sure there is a current session, the blog can be found, and the user is the owner of the blog
//         if (!req.session.loggedIn) {
//           res.status(400).json({ message: 'You must be logged in to update a blog'});
//           return;
//         } else if (!blogData) {
//             res.status(404).json({ message: 'No Blog found with that id!' });
//         } else if (req.session.user !== blogData.user_id) {
//             res.status(400).json({ message: 'You must be the owner of this blog to update it'})
//         } else {
//             blogData.update({
//                 title: req.body.title,
//                 content: req.body.content
//             });
//             res.status(200).json(blogData);
//         };
//       } catch (err) {
//         res.status(500).json(err);
//       };
// });
//delete Comment
// router.delete('/:id', async (req, res) => {
//     try {
//         const blogData = await Blog.findByPk(req.params.id, {
//           include: [{ 
//             model: User
//           },
//         //   {
//         //     model: Comment,
//         //     through: { attributes: [ 'id', 'user_name', 'blog_id' ]}
//         //    }
//         ]
//         });
//         //run checks to make sure there is a current session, the blog can be found, and the user is the owner of the blog
//         if (!req.session.loggedIn) {
//           res.status(400).json({ message: 'You must be logged in to delete a blog'});
//           return;
//         } else if (!blogData) {
//             res.status(404).json({ message: 'No Blog found with that id!' });
//         } else if (req.session.user !== blogData.user_id) {
//             res.status(400).json({ message: 'You must be the owner of this blog to delete it'})
//         } else {
//             blogData.destroy();
//             res.status(200).json( { message: 'Blog successfully deleted'})
//         };
//       } catch (err) {
//         res.status(500).json(err);
//       };
// });

module.exports = router;
