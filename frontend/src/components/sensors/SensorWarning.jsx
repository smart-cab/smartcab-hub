// HighlightOverlay.js

import React from 'react';
import './SensorWarning.scss'; // Создайте файл стилей для компонента

function SensorWarning({width}) {
  return <div className="sensor-warning" style={{"width": width, zIndex: 10}}></div>;
};

export default SensorWarning;

