const blogDeleteHandler = async (event) => {
    event.preventDefault();
  
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
      }
        
    
  };

//   const commentDeleteHandler = async (event) => {
//     event.preventDefault();
  
//     const content = document.querySelector('#comment-content').value;
//     const blogId = document.querySelector('#blog-id').value;
    
//     if (content) {
        
//       const response = await fetch(`/api/comments/${blogId}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.replace('/api/users/dashboard');
//       } else {
//         alert('Something went wrong!');
//       }
//     }
//   };

//   try {
//     document
//   .querySelector('#delete-comment')
//   .addEventListener('submit', commentDeleteHandler);
//   } catch (error) {
    
//   }
  
try {
    document
  .querySelector('.delete-blog')
  .addEventListener('click', blogDeleteHandler);
} catch (error) {
    console.log(error);
}
  