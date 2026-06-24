import AboutMe from './components/About_me'
import ContactMe from './components/Contact_me';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import {Element} from 'react-scroll'
import BubbleBackground from './components/BubbleBackground';

export default function App() {
  return (
    <div className='bg-black text-white font-Space-Grostesk min-h-screen font-space relative overflow-x-hidden'>

      <BubbleBackground/>
      <div className="relative z-10">
        <Element name='AboutME'>
          <AboutMe/>
        </Element>
        
        <Element name='Experience'>
          <Experience/>
        </Element>
        
        <Element name='Education'>
          <Education/>
        </Element>
        
        <Element name='ContactMe'>
          <ContactMe/>
        </Element>
        
        <Footer/>    
      </div>
    </div>
  );
}