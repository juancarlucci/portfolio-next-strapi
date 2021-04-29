import Navbar from "./Navbar";

export default function Layout({ children }) {

  return (
    <div className="layout svg-bg-4">
      <Navbar/>
      <div className="container">
        { children }
      </div>
      <footer>
        <p>Copyright 2021 Juan Carlos Collins</p>
      </footer>
    </div>
  )
}