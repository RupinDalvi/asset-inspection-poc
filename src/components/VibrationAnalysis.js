import React, { useRef, useState, useContext } from 'react';
import { calculateMagnitude, classifyVibration } from '../services/vibration';
import { InspectionContext } from '../contexts/InspectionContext';
export default function VibrationAnalysis() {
  const canvasRef = useRef();
  const [running,setRunning]=useState(false);
  const { setVibrationResult, setRawVibrationData } = useContext(InspectionContext);
  const start = () => {
    const data=[];
    const ctx=canvasRef.current.getContext('2d');
    const { width, height } = canvasRef.current;
    ctx.clearRect(0,0,width,height);
    let count=0, max=100;
    const handler=ev=>{
      const {x,y,z}=ev.accelerationIncludingGravity;
      const mag=calculateMagnitude({x,y,z});
      data.push({x,y,z,magnitude:mag,timestamp:Date.now()});
      ctx.fillRect((count/max)*width, height-(mag/20)*height,2,2);
      if(++count>=max){ window.removeEventListener('devicemotion',handler);
        const res=classifyVibration(data);
        setRawVibrationData(data);
        setVibrationResult(res);
        setRunning(false);
      }};
    window.addEventListener('devicemotion',handler);
    setRunning(true);
  };
  return (<div className="mb-4">
    <h3 className="font-medium mb-1">Vibration Analysis</h3>
    <button onClick={start} disabled={running} className="bg-indigo-500 text-white px-3 py-1 rounded mb-2">
      {running?'Analyzing...':'Start Vibration Analysis'}
    </button>
    <canvas ref={canvasRef} width={300} height={100} className="border" />
  </div>);
}

