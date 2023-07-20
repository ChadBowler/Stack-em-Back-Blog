//front end logic for adding data
const blogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value;

    if (title && content) {
        
      const response = await fetch('/api/blogs/', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Something went wrong!');
      }
    }
  };

  const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment-content').value;
    const blogId = document.querySelector('#blog-id').value;
    
    if (content) {
        
      const response = await fetch(`/api/comments/${blogId}`, {
        method: 'POST',
        body: JSON.stringify({ comment_content: content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Something went wrong!');
      }
    }
  };
//event listeners set in try blocks to prevent errors when one of the forms is not on the page
  try {
    document
  .querySelector('.add-comment-form')
  .addEventListener('submit', commentFormHandler);
  } catch (error) {
    console.log(error);
  };
  
try {
    document
  .querySelector('.add-blog-form')
  .addEventListener('submit', blogFormHandler);
} catch (error) {
    console.log(error);
};
  