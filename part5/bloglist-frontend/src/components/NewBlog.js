import { useState } from "react";
import blogService from "../services/blogs";

const NewBlog = ({ blogs, setBlogs, setNotification, blogFormRef }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleInfoMessage = (message, severity) => {
    setNotification({ message, severity });
    setTimeout(() => setNotification(null), 5000);
  };

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
    };

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs([...blogs, returnedBlog]);
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
        handleInfoMessage(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        );
        blogFormRef.current.toggleVisibility();
      })
      .catch((error) => {
        handleInfoMessage(error.response.data.error, "error");
      });
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="new-title">title:</label>
          <input
            type="text"
            name="new-title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new-author">author:</label>
          <input
            type="text"
            name="new-author"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new-url">url:</label>
          <input
            type="text"
            name="new-url"
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
