
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import About from './pages/about';
import Home from './pages/home';
import Profile from './pages/profile';
import Signin from './pages/signIn';
import SignUp from './pages/signUp';

export default function App() {
  return  (
  <BrowserRouter>
     <Header/>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/signin" element={<Signin />} />
       <Route path="/about" element={<About />} />
       <Route element ={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile />} />
       </Route>
       
    
     </Routes>
   </BrowserRouter>
  )
}
