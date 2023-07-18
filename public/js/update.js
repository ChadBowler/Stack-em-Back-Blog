const blogUpdateHandler = async (event) => {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

      if (id) {
        
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
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
  .querySelector('.update-blog')
  .addEventListener('click', blogUpdateHandler);
} catch (error) {
    console.log(error);
}