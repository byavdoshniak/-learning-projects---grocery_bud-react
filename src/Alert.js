import React from 'react'

const Alert = ({ alert }) => {
  const { alertType, alertText } = alert
  return <p className={alertType}>{alertText}</p>
}
export default Alert
