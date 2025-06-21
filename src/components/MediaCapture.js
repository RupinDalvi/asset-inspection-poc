/*
File: apps/inspection-app/src/components/MediaCapture.js
*/

import React, { useRef, useState, useEffect, useContext } from 'react';
import { InspectionContext } from '../contexts/InspectionContext';
import { getCurrentPosition } from '../services/geolocation';

export default function MediaCapture() {
  const videoRef = useRef(null);
  const recorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const { photos, setPhotos, videos, setVideos } = useContext(InspectionContext);

  useEffect(() => {
    let stream;
    async function initMedia() {
      try {
        // Request the rear camera if available
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: true
        });
        videoRef.current.srcObject = stream;
        recorderRef.current = new MediaRecorder(stream);

        recorderRef.current.ondataavailable = async (e) => {
          const blob = e.data;
          let pos;
          try { pos = await getCurrentPosition(); }
          catch { pos = { latitude: null, longitude: null, accuracy: null, timestamp: Date.now() }; }
          const url = URL.createObjectURL(blob);
          setVideos(v => [...v, { blob, url, location: pos, timestamp: pos.timestamp }]);
        };
      } catch (err) {
        console.error('MediaCapture init error:', err);
      }
    }

    initMedia();

    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(async (blob) => {
      let pos;
      try { pos = await getCurrentPosition(); }
      catch { pos = { latitude: null, longitude: null, accuracy: null, timestamp: Date.now() }; }
      const url = URL.createObjectURL(blob);
      setPhotos(p => [...p, { blob, url, location: pos, timestamp: pos.timestamp }]);
    }, 'image/jpeg');
  };

  const toggleRec = () => {
    if (recording) {
      recorderRef.current.stop();
      setRecording(false);
    } else {
      recorderRef.current.start();
      setRecording(true);
    }
  };

  return (
    <div className="mb-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full max-w-md mb-2 rounded shadow"
      />
      <div className="space-x-2">
        <button onClick={takePhoto} className="bg-green-500 text-white px-3 py-1 rounded">
          Take Photo
        </button>
        <button onClick={toggleRec} className="bg-yellow-500 text-white px-3 py-1 rounded">
          {recording ? 'Stop Recording' : 'Record Video'}
        </button>
      </div>
      <div className="mt-2 flex space-x-2 overflow-x-auto">
        {photos.map((p, i) => (
          <img key={i} src={p.url} alt={`Photo ${i+1}`} className="w-20 h-20 object-cover rounded" />
        ))}
        {videos.map((v, i) => (
          <video key={i} src={v.url} controls className="w-20 h-20 rounded" />
        ))}
      </div>
    </div>
  );
}
