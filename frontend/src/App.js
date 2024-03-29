import Portfolio from "./components/Portfolio";
import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import News from "./components/News";
import axios from "axios";
import Search from "./components/Search";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HistoryPage from "./pages/HistoryPage";
import ResearchPage from "./pages/ResearchPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<RegisterPage />} path="/register" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<HistoryPage />} path="/history" />
          <Route element={<ResearchPage />} path="/research" />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

// function App() {

//   return (
//     <div className='container-fluid'>
//         <Router>
//
//             <Header />
//           <Routes>
// <Route element = {<PrivateRoute> <HomePage /> </PrivateRoute>} path = "/"/>
// <Route element = {<RegisterPage />} path = "/register" />
// <Route element = {<LoginPage/>} path = "/login"/>
//           </Routes>
//           </AuthProvider>
//         </Router>
//     </div>
//   );
// }

// export default App;

// import Portfolio from './components/Portfolio'
// import React, { useEffect, useState } from 'react'
// import SideBar from './components/SideBar'
// import News from './components/News'
// import axios from "axios";
// import Search from './components/Search';

{
  /* <div className = "row padding-top">        
<SideBar />
<Portfolio/>
<News />
</div>
<div class="row padding-between"> 
</div>
<div className = "row justify-content-end">
<Search/>
</div> */
}

{
  /* <div className = "row padding-top">        
<SideBar />
<Portfolio/>
<News />
</div>
<div class="row padding-between"> 
</div>
<div className = "row justify-content-end">
<Search/>
</div> */
}
