import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
          <header style = {{padding: '20px', borderRadius:'10px', marginTop: '10px',
          }}>

    <a href="#" className="logo">MyShop</a>

    <nav className="nav-links" style={{fontSize:'25px', fontWeight:'bold', position:'sticky', zIndex:'1000',
            top:'0'}}>
      <li style={{listStyleType: 'none'}}><Link to = "/">Home</Link></li>
      <li style={{listStyleType: 'none'}}><Link to = "/">Products</Link></li>
      <li style={{listStyleType: 'none'}}><Link to = "/dashboard">Dashboard</Link></li>
  

      
      
    
    </nav>
  </header>

      
    </div>
  )
}

export default Header
