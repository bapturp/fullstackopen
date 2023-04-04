import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, blogs }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    const modifiedLikes = {
      likes: blog.likes + 1,
    };

    blogService.update(blog.id, modifiedLikes).then(() => {
      setBlogs(
        blogs.map((b) => {
          if (b.id === blog.id) {
            b.likes++;
            return b;
          } else {
            return b;
          }
        })
      );
    });
  };

  if (!showDetails) {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title} {blog.author}{" "}
          <button onClick={() => setShowDetails(!showDetails)}>view</button>
        </p>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setShowDetails(!showDetails)}>hide</button>
      </p>
      <a href={blog.url}>{blog.url}</a>
      <p>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </p>
      <p>{blog.user?.name !== undefined ? blog.user.name : null}</p>
    </div>
  );
};

export default Blog;
