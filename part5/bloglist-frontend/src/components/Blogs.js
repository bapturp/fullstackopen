import { useState, useEffect, useRef } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";
import UserInfo from "./UserInfo";
import NewBlog from "./NewBlog";
import Notification from "./Notification";
import Togglable from "./Togglable";

const Blogs = ({ user, notification, setNotification }) => {
  const [blogs, setBlogs] = useState([]);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      <UserInfo user={user} />

      <Togglable buttonLabel="new Blog" ref={blogFormRef}>
        <NewBlog
          blogs={blogs}
          setBlogs={setBlogs}
          setNotification={setNotification}
          blogFormRef={blogFormRef}
        />
      </Togglable>

      {blogs
        .sort((a, b) => a.likes < b.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
        ))}
    </div>
  );
};

export default Blogs;
