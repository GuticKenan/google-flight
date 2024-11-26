import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';

const AppRoutes: React.FC = () => {
    return (
      <Routes>
        <Route path="/flights" element={<Home />} />
        <Route path="*" element={<Navigate to="/flights" />} />
      </Routes>
    );
};

export default AppRoutes;
