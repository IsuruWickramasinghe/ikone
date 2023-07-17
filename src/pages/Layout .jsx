// import React from 'react'

// import NavBar from '../components/NavBar/NavBar'
// import Footer from '../components/Footer/Footer'
// import Copyringt from '../components/CopyRights/Copyringt'


// function Layout ({children}) {
//   return (
//     <div className="layout">
//       <nav className='nav-bar'>
//         <NavBar />
//       </nav>
//       <main className='main'>
//         {children}
//       </main>
//       <footer className='footer'>
//         <Footer />
//       </footer>
//       <Copyringt />
//     </div>
//   )
// }

// export default Layout 


import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Copyringt from '../components/CopyRights/Copyringt';

import LoadingScreen from '../components/LoadingScreen/LoadingScreen';

import { useStateContext } from '../context/StateContext';


function Layout({ children }) {

  const { loading } = useStateContext()


  return (
    <div className="layout">
      {loading ? (
        <div className='loading-screen'>
          <LoadingScreen />
        </div>
      ) : (
        <>
          <nav className="nav-bar">
            <NavBar />
          </nav>
          <main className="main">
            {children}
          </main>
          <footer className="footer">
            <Footer />
          </footer>
          <Copyringt />
        </>
      )}
    </div>
  );
}

export default Layout;
