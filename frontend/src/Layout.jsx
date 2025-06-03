import Login from "./components/Auth/login"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
Footer
export default function layout() {
  return (
    <div>
        <Navbar/>
        <Login/>
        <Footer/>
    </div>
  )
}
