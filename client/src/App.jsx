
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/about';
import Home from './pages/home';
import Profile from './pages/profile';
import Signin from './pages/signIn';
import SignUp from './pages/signUp';

export default function App() {
  return  (<BrowserRouter>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/signin" element={<Signin />} />
       <Route path="/about" element={<About />} />
       <Route path="/profile" element={<Profile />} />
     </Routes>
   </BrowserRouter>
  )
}
