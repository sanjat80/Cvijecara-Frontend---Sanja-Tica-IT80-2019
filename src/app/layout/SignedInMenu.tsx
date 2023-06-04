import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { setUser, signOut } from '../../features/account/accountSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.account);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect (()=>{
    const user = localStorage.getItem('user');
    if(user){
      dispatch(setUser(JSON.parse(user)));
    }
  },[dispatch])
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if(!user){
    return null;
  }
  return (
    <>
      <Button
      color='inherit'
      onClick={handleClick}
      sx={{typography: 'h6'}}
      >
        {user?.korisnickoIme}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem component={Link} to='/user'>Moj profil</MenuItem>
        <MenuItem onClick={()=> dispatch(signOut())}>Logout</MenuItem>
      </Menu>
    </>
  );
}
