import './App.css';
import AppHome from './Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'element={<AppHome />}></Route>
          <Route path='/login'element={<Login />}></Route>
          <Route path='/register'element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
