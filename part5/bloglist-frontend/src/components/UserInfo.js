const UserInfo = ({ user }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear("loggedBlogappUser");
    window.location.reload();
  };

  return (
    <div>
      <p>
        {user.name} logged in{" "}
        <button
          onClick={(event) => {
            handleLogout(event);
          }}
        >
          Logout
        </button>
      </p>
    </div>
  );
};

export default UserInfo;
