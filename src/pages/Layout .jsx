
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Copyringt from '../components/CopyRights/Copyringt';

function Layout({ children }) {

  return (
    <div className="maintain">
      <div><h1>IKONE IS UNDER MAINTENANCE...</h1></div>
      <img src="./clip.gif" alt="bv"/>
    </div>
  )


  // return (
  //     <div className="layout">
  //       <nav className="nav-bar">
  //         <NavBar />
  //       </nav>
  //       <main className="main">
  //         {children}
  //       </main>
  //       <footer className="footer">
  //         <Footer />
  //       </footer>
  //       <Copyringt />
  //     </div>
  // );
}

export default Layout;
