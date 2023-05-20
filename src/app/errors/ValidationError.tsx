import React from 'react';

export const Error = (errorMessages: any[]) => (
  <div className="error">
    {errorMessages.map((errorMessage, index) => (
      <div key={index}>{errorMessage}</div>
    ))}
  </div>
);

//export default Error;
