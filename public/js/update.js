//front end logic for updating blogs
const blogUpdateHandler = async (event) => {
    event.preventDefault();
  //get id from the url
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
        //should redirect to the dashboard after updating the blog
        if (response.ok) {
          document.location.replace('/api/users/dashboard');
        } else {
          alert('Something went wrong!');
        }
      };
  };

try {
    document
  .querySelector('.update-blog-form')
  .addEventListener('click', blogUpdateHandler);
} catch (error) {
    console.log(error);
}