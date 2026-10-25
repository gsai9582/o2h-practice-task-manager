import { Navigate, Route, Routes } from 'react-router-dom';
import AddTask from './pages/AddTask.jsx';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add" element={<AddTask />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

