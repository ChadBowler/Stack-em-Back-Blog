const { Blog } = require('../models');

const blogData = [
    {
      "title": "My First Blog",
      "content": "This is my first blog post. I'm excited to start blogging!",
      "user_id": "test1"
    },
    {
      "title": "My Thoughts on the New Movie",
      "content": "I just saw the new movie, and I really liked it. The acting was great, and the story was really interesting.",
      "user_id": "test2"
    },
    {
      "title": "My Favorite Book",
      "content": "My favorite book is The Hitchhiker's Guide to the Galaxy. It's such a funny and clever book. I highly recommend it!",
      "user_id": "test3"
    },
    {
      "title": "My New Project",
      "content": "I'm starting a new project to help people learn to code. I'm really excited about it, and I think it's going to be great!",
      "user_id": "test4"
    },
    {
      "title": "My Thoughts on the Latest News",
      "content": "I'm really worried about the latest news. I think it's a really important issue, and I hope we can find a solution soon.",
      "user_id": "test5"
    },
    {
      "title": "My Favorite TV Show",
      "content": "My favorite TV show is Breaking Bad. It's such a well-written and acted show. I highly recommend it!",
      "user_id": "test6"
    },
    {
      "title": "My Travel Plans",
      "content": "I'm planning a trip to Europe next year. I'm really excited to see all the different countries and cultures.",
      "user_id": "test7"
    },
    {
      "title": "My New Year's Resolutions",
      "content": "My New Year's resolutions are to learn to play the guitar, read more books, and travel more. I'm really excited to see if I can achieve them!",
      "user_id": "test8"
    },
    {
      "title": "My Thoughts on the Future",
      "content": "I'm really excited about the future. I think there are a lot of great things that are going to happen in the next few years.",
      "user_id": "test9"
    },
    {
      "title": "My Goals for the Year",
      "content": "My goals for the year are to get a promotion at work, start a blog, and learn a new language. I'm really excited to see if I can achieve them!",
      "user_id": "test10"
    }
    
  ];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;