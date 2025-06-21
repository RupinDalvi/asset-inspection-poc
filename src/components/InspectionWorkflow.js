import React, { useContext } from 'react';
import { InspectionContext } from '../contexts/InspectionContext';
import MediaCapture from './MediaCapture';
import DefectForm from './DefectForm';
import DefectList from './DefectList';
import VibrationAnalysis from './VibrationAnalysis';
import SubmitReport from './SubmitReport';
export default function InspectionWorkflow() {
  const { assetId, vibrationResult } = useContext(InspectionContext);
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Inspecting: {assetId}</h2>
      <MediaCapture />
      <DefectForm />
      <DefectList />
      <VibrationAnalysis />
      {vibrationResult && <SubmitReport />}
    </div>
  );
}

