/*
File: apps/inspection-app/src/components/MediaCapture.js
*/
import React, { useRef, useState, useContext } from 'react';
import { InspectionContext } from '../contexts/InspectionContext';
import { getCurrentPosition } from '../services/geolocation';

export default function MediaCapture() {
  const videoRef    = useRef(null);
  const recorderRef = useRef(null);
  const { photos, setPhotos, videos, setVideos } = useContext(InspectionContext);

  const [stream, setStream]       = useState(null);
  const [recording, setRecording] = useState(false);
  const [error, setError]         = useState('');

  const initCamera = async () => {
    setError('');
    let s;
    // 1️⃣ Try rear‐facing *video only*
    try {
      s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: 'environment' } }
      });
    } catch (envErr) {
      // 2️⃣ Fallback to any camera
      try {
        s = await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (anyErr) {
        console.error('getUserMedia failed:', anyErr);
        setError('Camera permission denied or not available.');
        return;
      }
    }

    // 🎥 Got a stream!
    setStream(s);
    videoRef.current.srcObject = s;

    // MediaRecorder (record video only)
    recorderRef.current = new MediaRecorder(s);
    recorderRef.current.ondataavailable = async (e) => {
      const blob = e.data;
      let pos;
      try { pos = await getCurrentPosition(); }
      catch { pos = { coords:{latitude:null,longitude:null,accuracy:null}, timestamp:Date.now() }; }
      const { latitude, longitude, accuracy } = pos.coords;
      setVideos(v => [
        ...v,
        {
          blob,
          url: URL.createObjectURL(blob),
          location: { latitude, longitude, accuracy },
          timestamp: pos.timestamp
        }
      ]);
    };
  };

  const takePhoto = () => {
    if (!stream) return setError('Please initialize the camera first.');
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(async blob => {
      let pos;
      try { pos = await getCurrentPosition(); }
      catch { pos = { coords:{latitude:null,longitude:null,accuracy:null}, timestamp:Date.now() }; }
      const { latitude, longitude, accuracy } = pos.coords;
      setPhotos(p => [
        ...p,
        {
          blob,
          url: URL.createObjectURL(blob),
          location: { latitude, longitude, accuracy },
          timestamp: pos.timestamp
        }
      ]);
    }, 'image/jpeg');
  };

  const toggleRec = () => {
    if (!recorderRef.current) return setError('Please initialize the camera first.');
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
      {!stream && (
        <button
          onClick={initCamera}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-2"
        >
          Initialize Camera
        </button>
      )}
      {error && <p className="text-red-600 mb-2">Error: {error}</p>}

      {stream && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-w-md mb-2 rounded shadow"
          />
          <div className="space-x-2 mb-2">
            <button onClick={takePhoto} className="bg-green-500 text-white px-3 py-1 rounded">
              Take Photo
            </button>
            <button onClick={toggleRec} className="bg-yellow-500 text-white px-3 py-1 rounded">
              {recording ? 'Stop Recording' : 'Record Video'}
            </button>
          </div>
        </>
      )}

      <div className="flex space-x-2 overflow-x-auto">
        {photos.map((p,i) => (
          <img key={i} src={p.url} className="w-20 h-20 object-cover rounded" />
        ))}
        {videos.map((v,i) => (
          <video key={i} src={v.url} controls className="w-20 h-20 rounded" />
        ))}
      </div>
    </div>
  );
}


