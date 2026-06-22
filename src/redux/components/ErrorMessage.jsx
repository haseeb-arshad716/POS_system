import React from 'react'

const ErrorMessage = ({message}) => {
  if(!message ) return null;
  return (
    <div>
      <p style={{color:'red', backgroundColor:'#fdecea',textAlign:'center'}} className='p-2 '>{message}</p>
    </div>
  )
}

export default ErrorMessage
