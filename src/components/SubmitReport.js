/*
File: apps/inspection-app/src/components/SubmitReport.js
*/
import React, { useState, useContext } from 'react';
import { auth, firestore } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { InspectionContext } from '../contexts/InspectionContext';

// Convert Blob to DataURL
function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = reject;
    r.onload = () => resolve(r.result);
    r.readAsDataURL(blob);
  });
}

// Prepare media items for Firestore
async function prepareMediaData(items) {
  return Promise.all(
    items.map(async ({ blob, location, timestamp }) => {
      const dataURL = await blobToDataURL(blob);
      return {
        dataURL,
        location: {
          latitude: location?.latitude ?? null,
          longitude: location?.longitude ?? null,
          accuracy: location?.accuracy ?? null
        },
        timestamp: timestamp ?? null
      };
    })
  );
}

export default function SubmitReport() {
  const {
    assetId,
    photos,
    videos,
    defects,
    vibrationResult,
    rawVibrationData
  } = useContext(InspectionContext);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setMsg('');
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      const photoData = await prepareMediaData(photos);
      const videoData = await prepareMediaData(videos);

      await addDoc(
        collection(
          firestore,
          `artifacts/demo/users/${user.uid}/inspection_reports`
        ),
        {
          assetId,
          userId: user.uid,
          timestamp: serverTimestamp(),
          defects,
          photoData,
          videoData,
          vibrationResult,
          rawVibrationData: JSON.stringify(rawVibrationData || [])
        }
      );

      setMsg('✅ Report submitted successfully!');
      // reset by reloading
      setTimeout(() => window.location.reload(), 1000);
    } catch (e) {
      console.error('SubmitReport error:', e);
      setMsg(`Submission failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Inspection Report'}
      </button>
      {msg && <p className="mt-2 text-center">{msg}</p>}
    </div>
  );
}
