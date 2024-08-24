import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoProConnectionWrapper from './GoProConnectionWrapper';
import MediaListPage from './MediaListPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<GoProConnectionWrapper />} />
          <Route path="/media" element={<MediaListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
