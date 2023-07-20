const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

//for any routes that don't fit any of our router.use routes
router.get('/*', (req, res) => {
    res.status(404).render('404');
});

module.exports = router;
