
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Copyringt from '../components/CopyRights/Copyringt';
import MainCountDown from '../Temp/MainCountDown';
import { useState } from 'react';


function Layout({ children }) {

  const [timerEnd,setTimerEnd] = useState(true)

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
