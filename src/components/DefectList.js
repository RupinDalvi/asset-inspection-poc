import React from 'react';
import { InspectionContext } from '../contexts/InspectionContext';
export default function DefectList() {
  const { defects } = React.useContext(InspectionContext);
  if (!defects.length) return null;
  return (<div className="mb-4">
    <h3 className="font-medium mb-1">Defects Logged</h3>
    <ul className="list-disc list-inside">{defects.map((d,i)=><li key={i}>{d.description} — <strong>{d.severity}</strong></li>)}</ul>
  </div>);
}

