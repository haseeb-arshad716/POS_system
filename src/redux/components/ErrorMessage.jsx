import React from 'react'

const ErrorMessage = ({message}) => {
  if(!message ) return null;
  return (
    <div>
      <p style={{color:'red'}}>{message}</p>
    </div>
  )
}

export default ErrorMessage
