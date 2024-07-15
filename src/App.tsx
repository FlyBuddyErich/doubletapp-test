import React from 'react';
import './App.css';
import Authorization from './pages/authorization/Authorization';
import List from './pages/list/List';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentAdd from './pages/student++/StudentAdd';







const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route path="/list" element={<List />} />
        <Route path='/student-add' element={<StudentAdd />} />
      </Routes>
    </Router>
  );
};

export default App;
