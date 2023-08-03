import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Userlisting from './Component/Userlisting';
import Adduser from './Component/Adduser';
import Updateuser from './Component/Updateuser';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import Login from './Component/Login';
import SignUp from "./Component/Signup"
import ForgotPassword from './Component/ForgotPassword';

function App() {
  return (
    <Provider store={Store}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
          <Route path='/user' element={<Userlisting></Userlisting>}></Route>
          <Route path='/user/add' element={<Adduser></Adduser>}></Route>
          <Route path='/user/edit/:code' element={<Updateuser></Updateuser>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer className="toast-position"
        position="bottom-right"></ToastContainer>
    </div>
    </Provider>
  );
}

export default App;
