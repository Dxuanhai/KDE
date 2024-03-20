import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Settings from './components/Settings.jsx';
import UserManagement from './components/UserManagement.jsx';
import Dashboard from './components/Dashboard.jsx';
import AdminManagement from './components/AdminManagement.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/admin-management" element={<AdminManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
