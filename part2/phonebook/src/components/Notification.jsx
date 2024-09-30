const Notification = ({ notification }) => {
  const { status, message, enabled } = notification
  if (!enabled) {
    return null
  }

  const alertStatus = {
    success: 'alert-success',
    info: 'alert-info',
    danger: 'alert-danger',
  }

  return <div className={`alert ${alertStatus[status]}`}>{message}</div>
}

export default Notification
