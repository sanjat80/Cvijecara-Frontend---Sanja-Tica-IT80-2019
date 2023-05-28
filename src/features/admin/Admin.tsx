import { Button,  Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Admin(){
    const [admin, setAdmin]= useState("");
    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const username = parsedUser.data.korisnickoIme;
          setAdmin(username);
        }
    }, []);
    return (
        <>
        <h1 style={{fontWeight:'bold', color:'#90EE90', textAlign:'center'}}>ADMIN PANEL</h1>
        <h3>Admin:</h3>
        <h3 style={{fontWeight:'bold', color:'#90EE90'}}>{admin.toLocaleUpperCase()}</h3>
        <div style={{ background: 'transparent', border: '1px solid black', padding: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{marginBottom:'40px'}}>
            <h1 style={{marginTop:'100px', marginLeft:'80px'}}>1. KORISNICI</h1>
            <Link to="/adminUsers">
                <Button style={{ color: 'white', backgroundColor: '#90EE90' , marginLeft:'80px'}}>UREDI</Button>
            </Link>
        </div>
        <div>
            <h1 style={{marginTop:'100px', marginRight:'80px'}}>2. PAKOVANJA</h1>
            <Link to="/adminPackages">
                <Button style={{ color: 'white', backgroundColor: '#90EE90', marginRight:'80px' }}>UREDI</Button>
            </Link>
        </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{marginBottom:'60px'}}>
            <h1 style={{marginTop:'100px', marginLeft:'80px'}}>3. KATEGORIJE</h1>
            <Link to="/adminCategories">
                <Button style={{ color: 'white', backgroundColor: '#90EE90', marginLeft:'80px' }}>UREDI</Button>
            </Link>
        </div>
        <div>
            <h1 style={{marginTop:'100px', marginRight:'160px',}}>4. VRSTE</h1>
            <Link to="/adminTypes">
                <Button style={{ color: 'white', backgroundColor: '#90EE90' }}>UREDI</Button>
            </Link>
        </div>
        </div>
        </div>
        </>
    )
}