import { useState, useEffect } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";
import UserInfo from "./UserInfo";
import NewBlog from "./NewBlog";
import Notification from "./Notification";

const Blogs = ({ user, notification, setNotification }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      <UserInfo user={user} />

      <NewBlog
        blogs={blogs}
        setBlogs={setBlogs}
        setNotification={setNotification}
      />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
