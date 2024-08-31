import logo from './logo.svg';
import './App.css';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home/home';
import DragAndDropArea from './pages/DragAndDropArea';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/drag" element={<DragAndDropArea />} />

        <Route path="/" element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
