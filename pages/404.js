import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from "framer-motion";

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 2222)
  }, []);

    const transitionVariant = {
        pageInitial: {
            opacity: 0,
            x: '100vw'
        },
        pageAnimate: {
            opacity: 1,
            x: 0,
            transition:{delay: 0.3, type:'spring', stiffness: 223}
        },
        exit: {
            x: '-100vw',
            transition: { ease: 'easeInOut'}
        }
    };


  return (
      <div className="not-found-wrapper svg-bg-3">
        <div className="not-found">
          <h1>404</h1>
          <h2>Oops! That page cannot be found :(</h2>
          <p>Redirecting to <Link href="/"><a>Portfolio</a></Link>...</p>
        </div>
      <style jsx>{`
        .not-found-wrapper {
           max-width: 1280px;
           margin: 0 auto;
           padding-top: 200px;
           transform: rotateZ(-1deg);
        }
        
        .not-found {
          width: 100%;
          padding: 180px 80px;
          margin: 0 auto;
        }
        
        h1 {
          font-size: 3em;
          margin-right: 93%;
          transform: rotateZ(-180deg);
        }
      `}</style>
    </div>
  );
}
 
export default NotFound;