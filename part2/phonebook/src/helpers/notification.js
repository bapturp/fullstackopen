const notification = (setNotification, status, message) => {
  setNotification({
    status: status,
    message: message,
    enabled: true,
  })
  setTimeout(() => {
    setNotification({ status: '', message: '', enabled: false })
  }, 5000)
}

export default notification
