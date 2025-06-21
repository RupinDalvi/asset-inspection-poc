import React, { useState, useContext } from 'react';
import { InspectionContext } from '../contexts/InspectionContext';
export default function DefectForm() {
  const [desc, setDesc] = useState('');
  const [sev, setSev] = useState('Minor');
  const { defects, setDefects } = useContext(InspectionContext);
  const add = () => { if (!desc) return; setDefects([...defects,{description:desc,severity:sev}]); setDesc(''); setSev('Minor'); };
  return (<div className="mb-4">
    <h3 className="font-medium mb-1">Log Defect</h3>
    <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Defect Description" className="border p-1 rounded w-full mb-1" />
    <select value={sev} onChange={e=>setSev(e.target.value)} className="border p-1 rounded mb-1">
      <option>Minor</option><option>Moderate</option><option>Critical</option>
    </select>
    <button onClick={add} className="bg-blue-500 text-white px-2 py-1 rounded">Add Defect</button>
  </div>);
}

