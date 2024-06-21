import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './users'; 
import Createusers from './Createusers'; 
import Updateusers from './updateusers'; 
import HomePage from './home';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/disp' element={<Users />} /> {}
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<Createusers />} /> {}
          <Route path='/update/:id' element={<Updateusers  />} /> {}
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
