import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, IconButton, IconButtonProps, Typography, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { KorisnikProfile } from "../../app/models/user";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { red } from "@mui/material/colors";
import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import backgroundImage from "../../backgroundImage/pozadina1.jpg"
import AppTextBox from "../../app/components/TextBox";

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
    
    const [user, setUser] = useState<KorisnikProfile | null>();

    useEffect(()=>{
        const storedUser = localStorage.getItem('user')
        const user = storedUser&& JSON.parse(storedUser);
        const username = user.data.korisnickoIme;
        agent.User.getCurrentUser(username)
        .then((response)=>{
            setUser(response)
        })
        .catch(error => console.log(error.response))
    })
    return(
      <ProfileContainer>
      <Typography align="center" style={{fontWeight:'bold', fontSize: '24px', border: '4px solid white', padding: '10px', marginTop:'50px', color:'white' }}>MOJ PROFIL</Typography>
        <Divider style={{
        border: 'none',
        height: '2px',
        backgroundColor: 'white',
        margin: '0 auto',
      }}/>
      </ProfileContainer>
    )
}