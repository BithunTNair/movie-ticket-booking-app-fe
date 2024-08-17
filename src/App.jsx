
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Routing from './components/Routing'
import { ToastContainer } from 'react-toastify';
import Loader from './components/common/Loader';
import { useSelector } from 'react-redux';



function App() {

  const { loader } = useSelector(store=>store.general)
  return (
    <>
      <ToastContainer />
      <Routing />
      {loader && <Loader />}
    </>
  )
}

export default App
