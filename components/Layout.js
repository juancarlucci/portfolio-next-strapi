import Link from 'next/link'
import Navbar from "./Navbar";

export default function Layout({ children }) {
    // console.log("children", children)
  return (
    <div className="layout svg-bg-2">
      <Navbar/>
      <div className="container">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 Juan Carlos Collins</p>
      </footer>
        <style jsx>{`
                //.container {
                //  //padding-right: 15px;
                //  //padding-left: 15px;
                //  margin-right: auto;
                //  margin-left: auto;
                //  width: 1280px;
                //}
      `}</style>
    </div>
  )
}