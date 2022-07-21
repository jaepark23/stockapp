import React from 'react'

function SideBar() {
  return (
    <div className="nav flex-column flex-nowrap vh-100 overflow-auto text-white p-2">
      <h3> Stock Simulator </h3>
            <li className="nav-item">
                <a href="#" className="nav-link">
                    <span>Home</span>
                </a>
            </li>
            <li className="nav-item">
                <a href="#submenu1" className="nav-link">
                    <span>Order History</span> 
                  </a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link">
                    <span>NAV 1</span>
                </a>
            </li>
    </div>  
  )
}

export default SideBar

{/* <div class = "col-3">
<div class = "wrapper">
  <nav class = "sidebar">
    <h1> Hello</h1>
    <div class = "list-group">
    <a href="#" class="list-group-item" aria-current="true"> Test </a>
    </div>
  </nav>
</div>
</div> */}

