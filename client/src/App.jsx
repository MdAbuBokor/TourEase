
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import About from './pages/about';
import Accommodation from './pages/accommodation/Accommodation.jsx';
import CreateAccommodation from './pages/accommodation/CreateAccommodation.jsx';
import Rooms from './pages/accommodation/Rooms.jsx';
import SignInAccommodation from './pages/accommodation/SignInAccommodation.jsx';
import Home from './pages/home';
import Profile from './pages/profile';
import Signin from './pages/signIn';
import SignUp from './pages/signUp';

export default function App() {
  return  (
  <BrowserRouter>

     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/signin" element={<Signin />} />
       <Route path="/about" element={<About />} />
       <Route element ={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile />} />
       </Route>
       
       <Route path="/accommodation" element={<Accommodation />} />
       <Route path="/accommodation/create" element={<CreateAccommodation/>} />\
       <Route path="/accommodation/signin" element={<SignInAccommodation/>} />
       <Route path="/accommodation/rooms" element={<Rooms />} />
       
    
     </Routes>
   </BrowserRouter>
  )
}
