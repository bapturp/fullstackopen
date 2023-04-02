import loginService from "../services/login";
import blogService from "../services/blogs";
import Notification from "./Notification";

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  setUser,
  notification,
  setNotification,
}) => {
  const handleInfoMessage = (message, severity) => {
    console.log("notification send");
    setNotification({ message, severity });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exeption) {
      handleInfoMessage(exeption.response.data.error, "error");
    }
  };

  return (
    <div>
      <h2>Login to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
