const Notification = ({ notification }) => {
  if (!notification) return null;

  const { message, severity = "info" } = notification;

  return <div className={`notification ${severity}`}>{message}</div>;
};

export default Notification;
