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

  document
  .querySelector('.add-blog-form')
  .addEventListener('submit', blogFormHandler);