import Link from 'next/link';
import { motion} from "framer-motion";


const Navbar = () => {
    const transitionVariant = {
        pageInitial: {
            opacity: 0,
            x: '100vw'
        },
        pageAnimate: {
            opacity: 1,
            x: 0,
            transition:{delay: 0.5, type:'spring', stiffness: 223}
        },
        exit: {
            x: '-100vw',
            transition: { ease: 'easeInOut'}
        }
    }
    return (
        <div className="nav-container container">
        <nav>
            <div className="logo">
                <Link href="/">
                    <a>
                        <span>Juan Carlos Collins</span>
                        <span className="logo-subtitle">Web Developer | Data Visualizer</span>
                    </a>
                </Link>
            </div>
            {/*<div className="blank"></div>*/}
            <div className="nav-links">
                <Link href="/"><a>Projects</a></Link>
                {/*<Link href="/about"><a>About</a></Link>*/}
                {/*<Link href="/contact"><a>Contact</a></Link>*/}
            </div>
        </nav>
            <style jsx>{`
                .nav-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    background-color: rgb(68 68 68 / 88%);  
                    z-index: 2;
                }
                
                nav {
                  max-width: 1280px;
                  margin: 0 auto;
                  padding: 10px 0;
                  display: flex;
                  justify-content: space-between;
                  font-size: 1rem;
                }
                
                .logo {
                display: flex;
                }
                
                .nav-links {
                  display: flex;
                  align-items: center;
                }
                
                .nav-links a {
                  margin-left: 17px;
                }
                
                .logo span {
                  text-transform: uppercase;
                  margin-right: 40px;
                  display: inline-block;
                }
                
                // Responsive
              //@media only screen and (min-width: 992px) and (max-width: 1199px){
              //  nav {
              //    font-size: 20px;
              //  }
              //}
              //@media only screen and (min-width: 768px) and (max-width: 991px){
              //  nav {
              //    font-size: 20px;
              //  }
              //}
              @media only screen and (max-width: 767px){
                nav {
                  font-size: 14px;
                }
              }
              @media only screen and (max-width: 426px){
                .logo-subtitle {
                  font-size: 11px;
                }
              }
      `}</style>
        </div>
    )
}

export default Navbar;