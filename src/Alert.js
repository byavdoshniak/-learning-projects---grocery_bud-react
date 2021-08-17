import React from 'react'

const Alert = ({ alertSuccess, alertDanger, text }) => {
  let alertType
  if (alertSuccess) {
    alertType = 'alert alert-success'
  } else if (alertDanger) {
    alertType = 'alert alert-danger'
  }

  if (alertSuccess || alertDanger) {
    return <p className={alertType}>{text}</p>
  }
  return <></>
}

export default Alert
