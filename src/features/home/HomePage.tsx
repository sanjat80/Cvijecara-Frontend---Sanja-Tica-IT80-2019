import { Typography } from '@mui/material';
import React from 'react';

const Gallery = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F5F5F5' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 'calc(100vw / 3.55)', height: 'auto', overflow: 'hidden' }}>
          <img src="/images/pozadina1.jpg" alt="gallery-img-1" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
        </div>
        <div style={{ width: 'calc(100vw / 3)', height: 'auto', overflow: 'hidden' }}>
          <img src="/images/pozadina3.jpg" alt="gallery-img-2" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
        </div>
        <div style={{ width: 'calc(100vw / 3)', height: 'auto', overflow: 'hidden' }}>
          <img src="/images/pozadina2.jpg" alt="gallery-img-3" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px',boxShadow: '0px 0px 10px 1px #000000'
 }}>
        <Typography variant='h4' align='center' style={{ fontWeight: 'bold', color: 'black' ,fontFamily:'Old Standard TT'}}>
          Dobrodošli u <i>BOTANIKO...</i>
        </Typography>
        <Typography variant='h4' align='center' style={{ fontWeight: 'bold', color: 'black' ,fontFamily:'Old Standard TT'}}>
            Pronađite najljepše poklone za sve važne prilike na jednom mjestu
        </Typography>
      </div>
    </div>
  );
};

export default Gallery;
