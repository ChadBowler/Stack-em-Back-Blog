//front end logic for deleting blogs
const blogDeleteHandler = async (event) => {
    event.preventDefault();
  //getting the id of the current blog
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

      if (id) {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/api/users/dashboard');
        } else {
          alert('Something went wrong!');
        }
      };
  };
 
try {
    document
  .querySelector('.delete-blog')
  .addEventListener('click', blogDeleteHandler);
} catch (error) {
    console.log(error);
}
  