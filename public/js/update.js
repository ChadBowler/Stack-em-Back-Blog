const blogUpdateHandler = async (event) => {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value;

      if (title && content) {
        
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/api/users/dashboard');
      } else {
        alert('Something went wrong!');
      }
      }
  };

  try {
    document
  .querySelector('.update-blog-form')
  .addEventListener('click', blogUpdateHandler);
} catch (error) {
    console.log(error);
}