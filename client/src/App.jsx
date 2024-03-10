
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nothing404 from './components/Nothing404';
import PrivateRoute from './components/PrivateRoute';
import PrivateRouteAccommodation from './components/PrivateRouteAccommodation.jsx';
import UpdateRoom from './components/UpdateRoom.jsx';
import BookNowForm from './pages/BookNowForm.jsx';
import ShowAnAccDetails from './pages/ShowAnAccDetails.jsx';
import SinglePlace from './pages/SinglePlace.jsx';
import About from './pages/about';
import Accommodation from './pages/accommodation/Accommodation.jsx';
import CreateAccommodation from './pages/accommodation/CreateAccommodation.jsx';
import Rooms from './pages/accommodation/Rooms.jsx';
import SignInAccommodation from './pages/accommodation/SignInAccommodation.jsx';
import UpdateAccommodation from './pages/accommodation/UpdateAccommodation.jsx';
import Home from './pages/home';
import Profile from './pages/profile';
import Signin from './pages/signIn';
import SignUp from './pages/signUp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/about" element={<About />} />
        <Route path="/place/:place" element={<SinglePlace />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookform/:roomId" element={<BookNowForm />} />
        </Route>
        <Route path="/acc/:accId" element={<ShowAnAccDetails />} />
        
        

        <Route path="/accommodation/create" element={<CreateAccommodation />} />
        <Route path="/accommodation/signin" element={<SignInAccommodation />} />

        <Route element={<PrivateRouteAccommodation />}>
          <Route path="/accommodation" element={<Accommodation />} />
          <Route
            path="/accommodation/update"
            element={<UpdateAccommodation />}
          />
          <Route path="/accommodation/rooms" element={<Rooms />} />
          <Route
            path="/accommodation/room/update/:roomId"
            element={<UpdateRoom />}
          />
        </Route>

        {/* <Route path="/accommodation" element={<Accommodation />} />
       <Route path='/accommodation/update' element={<UpdateAccommodation />} />
       
       <Route path="/accommodation/rooms" element={<Rooms />} />
       <Route path="/accommodation/room/update/:roomId" element={<UpdateRoom/>} /> */}

<Route path="*" element={<Nothing404 />} />
      </Routes>
    </BrowserRouter>
  );
}
