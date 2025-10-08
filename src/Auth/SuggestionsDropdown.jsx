import React from 'react';

const SuggestionsDropdown = ({ areaSuggestions, handleAreaSelect, setFieldValue }) => {
  return (
    <div style={{ position: 'relative' }}>
      {/* Render suggestions if available */}
      {areaSuggestions.length > 0 && (
        <div
          className="dropdown-menu show"
          style={{
            display: 'block',
            position: 'absolute',
            zIndex: 1,
            width: 'auto',  // Ensure dropdown width matches the parent input field or container
            maxHeight:'200px',
            overflowY:"scroll",
            fontSize:"14px",
          }}
        >
          {areaSuggestions.map((area) => (
            <div
              key={area.id}
              className="dropdown-item"
              onClick={() => handleAreaSelect(area, setFieldValue)}
              style={{ cursor: 'pointer', whiteSpace:"normal" }}
            >
              {area.area_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestionsDropdown;
