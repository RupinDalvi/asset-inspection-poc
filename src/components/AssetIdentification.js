import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InspectionContext } from '../contexts/InspectionContext';
export default function AssetIdentification() {
  const [localId, setLocalId] = useState('');
  const { setAssetId } = useContext(InspectionContext);
  const navigate = useNavigate();
  const start = () => { if (!localId) return; setAssetId(localId.trim()); navigate('/inspection'); };
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Asset Identification</h1>
      <input
        className="border p-2 rounded mb-4 w-full max-w-sm"
        placeholder="Asset ID"
        value={localId}
        onChange={e => setLocalId(e.target.value)}
      />
      <button onClick={start} className="bg-blue-500 text-white px-4 py-2 rounded">
        Start Inspection
      </button>
    </div>
  );
}

