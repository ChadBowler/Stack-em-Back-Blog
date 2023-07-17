const { Comment } = require('../models');

const commentData = [
    {
        "comment_content": "I really enjoyed your post! I agree with your thoughts on the latest news.",
        "blog_id": 1,
        "user_name": "test8"
      },
      {
        "comment_content": "I haven't seen the new movie yet, but I'm excited to check it out. Thanks for the recommendation!",
        "blog_id": 2,
        "user_name": "test5"
      },
      {
        "comment_content": "The Hitchhiker's Guide to the Galaxy is one of my favorite books too! I'm glad you enjoyed it.",
        "blog_id": 3,
        "user_name": "test1"
      },
      {
        "comment_content": "Your project sounds really interesting! I'm excited to see how it turns out.",
        "blog_id": 4,
        "user_name": "test6"
      },
      {
        "comment_content": "I'm also worried about the latest news. I hope we can find a solution soon.",
        "blog_id": 5,
        "user_name": "test9"
      },
      {
        "comment_content": "I love Breaking Bad! It's one of my favorite TV shows too.",
        "blog_id": 6,
        "user_name": "test3"
      },
      {
        "comment_content": "I'm also planning a trip to Europe next year! I'm excited to see all the different countries and cultures.",
        "blog_id": 7,
        "user_name": "test4"
      },
      {
        "comment_content": "I'm also learning to play the guitar! It's a lot of fun, and I'm really enjoying it.",
        "blog_id": 8,
        "user_name": "test7"
      },
      {
        "comment_content": "I'm really excited about the future too! I think there are a lot of great things that are going to happen in the next few years.",
        "blog_id": 9,
        "user_name": "test2"
      },
      {
        "comment_content": "I'm also trying to get a promotion at work! It's a lot of hard work, but I'm confident that I can achieve it.",
        "blog_id": 10,
        "user_name": "test8"
      }
  ];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;