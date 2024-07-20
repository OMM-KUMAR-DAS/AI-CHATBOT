

import { Routes,Route } from 'react-router-dom';

import First from './Pages/First';

import Bot from './Pages/Bot';

import { ToastContainer } from 'react-toastify';

function App() {


  return (
    <>

       


            <Routes>


                  <Route path='/' element={<First/>} />

                  <Route path='/main' element={<Bot/>}/>


            </Routes>

            <ToastContainer/>

      

        {/* <First/>
        <Bot/> */}
      

    </>
  );
}

export default App;
