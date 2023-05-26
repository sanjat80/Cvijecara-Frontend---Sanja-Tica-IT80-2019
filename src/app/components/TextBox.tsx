import React from 'react';

interface Props{
    visina : string;
    sirina: string;

}

const AppTextBox = ({ visina, sirina}:Props) => {
  return (
    <div
      style={{
        height: `${visina}px`,
        width: `${sirina}px`,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'100px'
      }}
    >
    </div>
  );
};

export default AppTextBox;