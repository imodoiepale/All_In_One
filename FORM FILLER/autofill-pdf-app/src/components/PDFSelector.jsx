// TemplateSelector.js
import  { useState } from 'react';

const TemplateSelector = ({ onSelectTemplate }) => {
  const [template, setTemplate] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTemplate(file);
    onSelectTemplate(file);
  };

  return (
    <div>
      <label>Select PDF Template:</label>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
    </div>
  );
};

export default TemplateSelector;
