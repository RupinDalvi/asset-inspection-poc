import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AssetIdentification from './components/AssetIdentification';
import InspectionWorkflow from './components/InspectionWorkflow';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AssetIdentification/>} />
      <Route path="/inspection" element={<InspectionWorkflow/>} />
    </Routes>
  );
}

