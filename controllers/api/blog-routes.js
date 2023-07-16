const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

// get all Blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ 
        model: User
      },
    //   {
    //     model: Comment,
    //     through: { attributes: [ 'id', 'user_name', 'blog_id' ]}
    //    }
    ]
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blogs found!' });
      return;
    }

    res.status(200).json(blogData);
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
    //   {
    //     model: Comment,
    //     through: { attributes: [ 'id', 'user_name', 'blog_id' ]}
    //    }
    ]
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with that id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new Blog
router.post('/', async (req, res) => {

try {
    const blog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user
    });
    // res.redirect(`blogs/${blog.id}`)   
     res.status(200).json(blog)
} catch (error) {
    res.status(400).json(error)
}


//   Blog.create(req.body)
//     .then((blog) => {
//       // if there are blog Comments, we need to create pairings to bulk create
//       if (req.body.CommentIds.length) {
//         const blogCommentIdArr = req.body.CommentIds.map((comment_id) => {
//           return {
//             blog_id: blog.id,
//             comment_id,
//           };
//         });
//         return blogComment.bulkCreate(blogCommentIdArr);
//       }
//       // if no Blog Comments, just respond
//       res.status(200).json(blog);
//     })
//     .then((blogCommentIds) => res.status(200).json(blogCommentIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
});

// update Blog
router.put('/:id', (req, res) => {
  Blog.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Blog) => {
      if (req.body.CommentIds && req.body.CommentIds.length) {

        BlogComment.findAll({
          where: { Blog_id: req.params.id }
        }).then((BlogComments) => {
          // create filtered list of new Comment_ids
          const BlogCommentIds = BlogComments.map(({ Comment_id }) => Comment_id);
          const newBlogComments = req.body.CommentIds
            .filter((Comment_id) => !BlogCommentIds.includes(Comment_id))
            .map((Comment_id) => {
              return {
                Blog_id: req.params.id,
                Comment_id,
              };
            });

          // figure out which ones to remove
          const BlogCommentsToRemove = BlogComments
            .filter(({ Comment_id }) => !req.body.CommentIds.includes(Comment_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            BlogComment.destroy({ where: { id: BlogCommentsToRemove } }),
            BlogComment.bulkCreate(newBlogComments),
          ]);
        });
      }

      return res.json(Blog);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with that id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
