import AboutMe from './components/About_me'
import ContactMe from './components/Contact_me';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
export default function App() {
  return (
    <div className='bg-slate-900 text-white font-Space-Grostesk min-h-screen'>
      <Navbar/>
      <AboutMe/>
      <Experience/>
      <Education/>
      <ContactMe/>
      <Footer/>    
    </div>
  );
}