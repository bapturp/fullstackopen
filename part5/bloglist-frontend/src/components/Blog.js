import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
        likes {blog.likes} <button>like</button>
      </p>
      <p>{blog.user?.name !== undefined ? blog.user.name : null}</p>
    </div>
  );
};

export default Blog;
