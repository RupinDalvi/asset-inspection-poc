import React, { createContext, useState } from 'react';
export const InspectionContext = createContext();
export function InspectionProvider({ children }) {
  const [assetId, setAssetId] = useState('');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [defects, setDefects] = useState([]);
  const [vibrationResult, setVibrationResult] = useState(null);
  const [rawVibrationData, setRawVibrationData] = useState([]);
  return (
    <InspectionContext.Provider value={{
      assetId, setAssetId,
      photos, setPhotos,
      videos, setVideos,
      defects, setDefects,
      vibrationResult, setVibrationResult,
      rawVibrationData, setRawVibrationData
    }}>
      {children}
    </InspectionContext.Provider>
  );
}

