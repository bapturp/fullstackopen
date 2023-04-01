import { useState } from "react";
import blogService from "../services/blogs";

const NewBlog = ({ blogs, setBlogs }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs([...blogs, returnedBlog]);
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    });
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <label htmlFor="new-author">Author</label>
        <input
          type="text"
          name="new-author"
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
        />
        <label htmlFor="new-title">Title</label>
        <input
          type="text"
          name="new-title"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <label htmlFor="new-url">URL</label>
        <input
          type="text"
          name="new-url"
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
        />
        <button>Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
