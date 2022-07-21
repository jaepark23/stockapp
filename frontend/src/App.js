import Portfolio from './components/Portfolio'
import React, { useEffect, useState } from 'react'
import SideBar from './components/SideBar'
import News from './components/News'
import axios from "axios";
import Search from './components/Search';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import {AuthProvider} from './context/AuthContext'

function App() {
  
  return (
    <div className='container-fluid'>
        <Router>
          <AuthProvider>
            <Header />
          <Routes>
            <Route element = {<PrivateRoute> <HomePage /> </PrivateRoute>} path = "/"/> 
            <Route element = {<LoginPage/>} path = "/login"/> 
          </Routes>
          </AuthProvider>
        </Router>
    </div>
  );
}

export default App;


// import Portfolio from './components/Portfolio'
// import React, { useEffect, useState } from 'react'
// import SideBar from './components/SideBar'
// import News from './components/News'
// import axios from "axios";
// import Search from './components/Search';

// function App() {
  
//   return (
//     <div className='container-fluid'>
//       <div className='row'>
//         <div className='col-md-2 px-1 position-fixed' id = "sidebar">
//           <SideBar />
//         </div> 
//       <div className="col-md-10 offset-2" id = 'main'>
//         <div className = "padding-top"></div>
//           <div className='row'>
//             <Portfolio />
//             <News />
//           </div>
//         <div className = "padding-between"></div>
//         <div className='row'>
//           <Search />
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default App;


{/* <div className = "row padding-top">        
<SideBar />
<Portfolio/>
<News />
</div>
<div class="row padding-between"> 
</div>
<div className = "row justify-content-end">
<Search/>
</div> */}


{/* <div className = "row padding-top">        
<SideBar />
<Portfolio/>
<News />
</div>
<div class="row padding-between"> 
</div>
<div className = "row justify-content-end">
<Search/>
</div> */}