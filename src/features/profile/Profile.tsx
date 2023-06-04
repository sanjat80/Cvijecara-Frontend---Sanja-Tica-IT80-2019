import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, IconButton, IconButtonProps, Typography, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { KorisnikAdminUpdate, KorisnikProfile } from "../../app/models/user";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";

import backgroundImage from "../../backgroundImage/pozadina4.jpg"
import RegistredUserForm from "./RegistredUserForm";


const ProfileContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  height: '100vh',
});
export default function Profile()
{
    
    const [user, setUser] = useState<KorisnikAdminUpdate>();
    const [editMode, setEditMode] = useState(false);

    useEffect(()=>{
        const storedUser = localStorage.getItem('user')
        const user = storedUser&& JSON.parse(storedUser);
        const username = user.data.korisnickoIme;
        agent.User.getCurrentUser(username)
        .then((response)=>{
            setUser(response)
        })
        .catch(error => console.log(error.response))
    },[])
    const handleEditProfile = () => {
      setEditMode(true);
    };
  
    return(
      <ProfileContainer>
      <Typography align="center" style={{fontWeight:'bold', fontSize: '24px', border: '4px solid white', padding: '10px', marginTop:'50px', color:'white' }}>MOJ PROFIL</Typography>
        <Divider style={{
        border: 'none',
        height: '2px',
        backgroundColor: 'white',
        margin: '0 auto',
      }}/>
      <div>
      <table style={{marginTop:'150px', marginLeft:'50px'}}>
      <tbody style={{fontWeight:'bold', fontSize:"35px",color:'white',marginLeft:'50px'}}>
        <tr>
          <th style={{textAlign:'left'}}>IME:</th>
          <td>{user?.ime.toLocaleUpperCase()}</td>
        </tr>
        <tr>
          <th style={{textAlign:'left'}}>PREZIME:</th>
          <td>{user?.prezime.toLocaleUpperCase()}</td>
        </tr>
        <tr>
          <th style={{textAlign:'left'}}>EMAIL:</th>
          <td>{user?.email.toLocaleUpperCase()}</td>
        </tr>
        <tr>
          <th style={{textAlign:'left'}}>ADRESA:</th>
          <td>{user?.adresa.toLocaleUpperCase()}</td>
        </tr>
        <tr>
          <th style={{textAlign:'left'}}>BROJ TELEFONA:</th>
          <td style={{marginLeft:'5px'}}>{user?.brojTelefona.toLocaleUpperCase()}</td>
        </tr>
        <tr>
          <th style={{textAlign:'left'}}>KORISNICKO IME:</th>
          <td style={{marginLeft:'10px'}}>{user?.korisnickoIme.toLocaleUpperCase()}</td>
        </tr>
      </tbody>
    </table>
    {!editMode && (
    <button
      style={{
        color: 'black',
        backgroundColor: 'white',
        fontSize: '24px',
        padding: '10px 20px',
        borderRadius: '8px',
        border: '2px solid black',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        marginTop:'40px',
        marginLeft:'50px'
      }}
      onClick={handleEditProfile}
    > IZMJENI PROFIL</button>)}
    {editMode && <RegistredUserForm user={user} />}
      </div>
      </ProfileContainer>
    )
}