const User = require('./User');
const Comment = require('./Comment');
const Blog = require('./Blog');

//user association to blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
});
//user association to comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Comment.belongsTo(User, {
    foreignKey: 'user_id',
  });
//blog association to comments
  Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
  });
  
  Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
  });

module.exports = { User, Comment, Blog };