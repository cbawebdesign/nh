import React from 'react';

const TraderProfile = () => {
  const containerStyle: React.CSSProperties = {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '80%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  };

  const headingStyle: React.CSSProperties = {
    textAlign: 'left',
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  };

  const infoStyle: React.CSSProperties = {
    textAlign: 'left',
    color: '#666',
    fontSize: '16px',
    lineHeight: '1.6',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Trader Profile</h1>
      <div style={infoStyle}>
        <p><strong>Name:</strong> Christopher Brian Arce</p>
        <p><strong>Phone:</strong> 702-326-9861</p>
        <p><strong>Address:</strong> 3192 Mist Effect Ave, Henderson, NV 89044</p>
      </div>
    </div>
  );
}

export default TraderProfile;
