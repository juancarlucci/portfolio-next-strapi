import 'styles/globals.css'
import Layout from 'components/Layout'
import {AnimatePresence, motion} from 'framer-motion';
import React from 'react';

function App({ Component, pageProps, router }) {

  return (
      <Layout>
        <AnimatePresence exitBeforeEnter>

            <Component {...pageProps} key={router.route}/>
        </AnimatePresence>
    </Layout>
  )
}

export default App
