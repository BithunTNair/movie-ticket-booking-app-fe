
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Routing from './components/Routing'
import { ToastContainer } from 'react-toastify';
import Loader from './components/common/Loader';



function App() {


  return (
    <>
    <ToastContainer/>
      <Routing />
      {/* <Loader/> */}
    </>
  )
}

export default App
