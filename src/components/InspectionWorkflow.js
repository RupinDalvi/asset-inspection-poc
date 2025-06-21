// src/components/InspectionWorkflow.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InspectionContext } from '../contexts/InspectionContext';
import MediaCapture from './MediaCapture';
import DefectForm from './DefectForm';
import DefectList from './DefectList';
import VibrationAnalysis from './VibrationAnalysis';
import SubmitReport from './SubmitReport';

export default function InspectionWorkflow() {
  const {
    assetId,
    vibrationResult,
    resetInspection,   // clear the current inspection state
  } = useContext(InspectionContext);

  const navigate = useNavigate();

  const handleChangeAsset = () => {
    // clear out any captured data
    if (resetInspection) {
      resetInspection();
    }
    // go back to the asset identification screen
    navigate('/');
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          onClick={handleChangeAsset}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded shadow text-sm"
        >
          ← Change Asset
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Inspecting: {assetId}</h2>

      <MediaCapture />
      <DefectForm />
      <DefectList />
      <VibrationAnalysis />

      {vibrationResult && <SubmitReport />}
    </div>
  );
}
