import React from 'react';
import { FaCode } from 'react-icons/fa'; // Import the desired icon

const Favicon: React.FC = () => {
  return (
    <div style={{ display: 'none' }}>
      <FaCode size={32} color="#000" id="favicon-icon" />
    </div>
  );
};

export default Favicon;
