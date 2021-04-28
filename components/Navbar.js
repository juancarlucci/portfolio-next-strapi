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
                        <span>Web Developer | Data Visualizer</span>
                    </a>
                </Link>
            </div>
            <div className="blank"></div>
            <div className="nav-links">
                <Link href="/"><a>Projects</a></Link>
                <Link href="/about"><a>About</a></Link>
                <Link href="/contact"><a>Contact</a></Link>
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
                  //display: grid;
                  //grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                  //grid-gap: 2rem;
                }
                
                .logo {
                display: flex;
                }
                
                .nav-links a {
                  margin-left: 17px;
                }
                
                .logo span {
                  text-transform: uppercase;
                  margin-right: 40px;
                }
      `}</style>
        </div>
    )
}

export default Navbar;