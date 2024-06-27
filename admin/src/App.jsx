import Navbar from "./Components/Navbar/Navbar"
import Admin from "./Pages/Admin/Admin"
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
     <ToastContainer />
      <Navbar></Navbar>
      <Admin></Admin>
    </div>
  )
}

export default App