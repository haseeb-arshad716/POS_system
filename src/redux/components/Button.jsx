import React from 'react'

const Button = ({text,onChange,onClick}) => {
  return (
    <div>
     <button style={{backgroundColor: "#525354", 
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        margin: "5px",}}
        onClick={onClick}
        onChange={onChange}
        >
         {text}
        </button>
      

    </div>
  )
}

export default Button
