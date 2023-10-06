
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return  (<BrowserRouter>
     <Routes>
       <Route path="/" element={<home />} />
       <Route path="/signup" element={<signUp />} />
       <Route path="/signin" element={<signin />} />
       <Route path="/about" element={<about />} />
       <Route path="/profile" element={<profile />} />
     </Routes>
   </BrowserRouter>
  )
}
