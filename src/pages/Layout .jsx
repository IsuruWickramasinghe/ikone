
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Copyringt from '../components/CopyRights/Copyringt';
import { useState } from 'react';
import Countdown from '../temp/Countdown';



function Layout({ children }) {

  const [endDate,setEndDate] = useState(false)

  if(!endDate){
    return(
      <Countdown setEndDate={setEndDate} />
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
