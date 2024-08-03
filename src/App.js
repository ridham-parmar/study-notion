import './App.css';
import { Routes, Route } from 'react-router-dom' ;
import Home from './pages/Home';
import NavBar from './components/common/NavBar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail'
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  return (
    <div className="App w-screen h-[100dvh] bg-richblack-900 ">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/forgot-password' element={<ResetPassword/>} />
        <Route path="/update-password/:id" element={<UpdatePassword/>} />
      </Routes>
    </div>
  );
}

export default App;
