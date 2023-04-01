import { useState, useEffect } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";
import UserInfo from "./UserInfo";
import NewBlog from "./NewBlog";

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <UserInfo user={user} />

      <NewBlog blogs={blogs} setBlogs={setBlogs} />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
