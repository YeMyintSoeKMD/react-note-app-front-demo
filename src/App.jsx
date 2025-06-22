import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from './views/auth/Login';
import { Register } from './views/auth/Register';
import { Dashboard } from './views/Dashboard';
import { NewNote } from './views/NewNote';
import { Categories } from './views/Categories';
import { Archives } from './views/Archives';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-note" element={<NewNote />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/archives" element={<Archives />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
