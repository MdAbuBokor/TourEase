
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nothing404 from './components/Nothing404';
import PrivateRoute from './components/PrivateRoute';
import PrivateRouteAccommodation from './components/PrivateRouteAccommodation.jsx';
import PrivateRouteAdmin from './components/PrivateRouteAdmin.jsx';
import UpdateRoom from './components/UpdateRoom.jsx';
import BookNowForm from './pages/BookNowForm.jsx';
import MyBookings from './pages/MyBookings.jsx';
import ShowAnAccDetails from './pages/ShowAnAccDetails.jsx';
import SinglePlace from './pages/SinglePlace.jsx';
import About from './pages/about';
import AcBookings from './pages/accommodation/AcBookings.jsx';
import Accommodation from './pages/accommodation/Accommodation.jsx';
import CreateAccommodation from './pages/accommodation/CreateAccommodation.jsx';
import Rooms from './pages/accommodation/Rooms.jsx';
import SignInAccommodation from './pages/accommodation/SignInAccommodation.jsx';
import UpdateAccommodation from './pages/accommodation/UpdateAccommodation.jsx';
import AccAdmin from './pages/admin/accommodation.jsx';
import Admin from './pages/admin/admin.jsx';
import Locations from './pages/admin/locations.jsx';
import Home from './pages/home';
import Profile from './pages/profile';
import Review from './pages/review.jsx';
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
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/bookform/:roomId" element={<BookNowForm />} />
          <Route path="/review/:bookingId" element={<Review />} />
          

        </Route>
        <Route path="/acc/:accId" element={<ShowAnAccDetails />} />
        <Route path="/accommodation/create" element={<CreateAccommodation />} />
        <Route path="/accommodation/signin" element={<SignInAccommodation />} />

        <Route element={<PrivateRouteAccommodation />}>
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/accommodation/bookings" element={<AcBookings />} />
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

        <Route element={<PrivateRouteAdmin />}>
        <Route path="/admin" element={<Admin />} />
          <Route path="/admin/locations" element={<Locations />} />
          <Route path="/admin/acc" element={<AccAdmin />} />
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
