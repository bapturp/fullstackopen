import { useEffect, useState } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);

      blogService.setToken(user.token);
    }
  }, []);

  if (user === null) {
    return (
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        setUser={setUser}
        notification={notification}
        setNotification={setNotification}
      />
    );
  }

  return (
    <Blogs
      user={user}
      notification={notification}
      setNotification={setNotification}
    />
  );
};

export default App;
