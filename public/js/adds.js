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

  try {
    document
  .querySelector('.add-comment-form')
  .addEventListener('submit', commentFormHandler);
  } catch (error) {
    
  }
  
try {
    document
  .querySelector('.add-blog-form')
  .addEventListener('submit', blogFormHandler);
} catch (error) {
    
}
  