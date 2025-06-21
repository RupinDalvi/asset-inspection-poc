// src/components/SubmitReport.js

import React, { useState, useContext } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from '../services/firebase';
import { blobToDataURL } from '../utils/blobUtils';
import { InspectionContext } from '../contexts/InspectionContext';

/**
 * Convert an array of media items into Firestore‐safe objects:
 *  - blob → base64 dataURL
 *  - GeolocationCoordinates → plain { latitude, longitude, accuracy }
 */
async function prepareMediaData(mediaItems) {
  return Promise.all(
    mediaItems.map(async ({ blob, location, timestamp }) => {
      const dataURL = await blobToDataURL(blob);
      return {
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          accuracy: location.accuracy,
        },
        timestamp,
        dataURL,
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
    rawVibrationData,
  } = useContext(InspectionContext);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setMsg('');
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const uid = user.uid;

      console.log('Converting photos…');
      const photoData = await prepareMediaData(photos);

      console.log('Converting videos…');
      const videoData = await prepareMediaData(videos);

      console.log('Writing report to Firestore…');
      await addDoc(
        collection(
          firestore,
          `artifacts/demo/users/${uid}/inspection_reports`
        ),
        {
          assetId,
          userId: uid,
          timestamp: serverTimestamp(),
          defects,
          photoData,
          videoData,
          vibrationResult,
          rawVibrationData: JSON.stringify(rawVibrationData),
        }
      );

      setMsg('✅ Report submitted successfully! Reloading…');
      // give user a moment to read the success message
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      console.error('SubmitReport error:', e);
      setMsg(`Submission failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-2 rounded shadow ${
          loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {loading ? 'Submitting...' : 'Submit Inspection Report'}
      </button>
      {msg && (
        <p className="mt-3 text-center text-sm">
          {msg}
        </p>
      )}
    </div>
  );
}


