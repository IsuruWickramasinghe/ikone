
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Copyringt from '../components/CopyRights/Copyringt';
import { useState } from 'react';
import MainCountDown from '../Temp/MainCountDown';



function Layout({ children }) {

  const [timerEnd,setTimerEnd] = useState(false)

  if(!timerEnd){
    return(
      <div className="countDonwTimer">
        <MainCountDown setTimerEnd={setTimerEnd} />
      </div>
    )
  }

  return (
      <div className="layout">
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
      </div>
  );
}

export default Layout;
