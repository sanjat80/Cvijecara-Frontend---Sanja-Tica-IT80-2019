import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
import { useEffect, useState } from "react";
import { setUser } from "../../features/account/accountSlice";
import jwtDecode from "jwt-decode";

const midLinks = [
    {title:'katalog', path:'/catalog'},
    //{title:'o nama',path:'/about'},
    //{title:'kontakt',path:'/contact'}
]

const rightLinks = [
    {title:'prijava',path:'/login'},
    {title:'registracija',path:'/register'}
]

interface Props{
    darkMode: boolean;
    handleThemeChange: () => void;
}

interface decodedToken{
    role:string;
}

export default function Header({darkMode, handleThemeChange}:Props){
    const dispatch = useAppDispatch();
    const [isAdmin, setIsAdmin] = useState(false);
    const {user} = useAppSelector(state => state.account);
    /*const userToken = localStorage.getItem('user');
    const token = userToken ? JSON.parse(userToken).data.token : '';
    const decodedToken = jwtDecode<{ roles: string[] }>(token);
    const {roles} = decodedToken;
    const isAdmin = roles && roles.includes('admin'); */
    //const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const role = parsedUser.data.uloga;
          if(role === 'admin')
          {
            setIsAdmin(true)
          } else {
            setIsAdmin(false);
          }
          
          // Dispatch an action to update the user in the Redux store
          dispatch(setUser(parsedUser));
        }
    }, [dispatch]);

    return (
        <AppBar position="static" sx={{ backgroundColor: "#90EE90", color: "white", mb: 6 }}>
            <Toolbar sx={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
                <Box display='flex' alignItems='center'>
                <Typography variant='h6' component={NavLink} 
                to='/'
                sx={{color:'inherit',textDecoration:'none', fontWeight:'bold'}}
                >
                    BOTANIKO 
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange}/>
                </Box>
                <List sx={{display:'flex'}}>
                    {midLinks.map(({title, path})=>(
                        <ListItem
                         component={NavLink}
                         to={path}
                         key={path}
                         sx={{color:'inherit',typography: 'h6',fontWeight:'bold'}}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                    {user && isAdmin && 
                    <ListItem
                         component={NavLink}
                         to={'/inventory'}
                         sx={{color:'inherit',typography: 'h6',fontWeight:'bold'}}
                        >
                            INVENTAR
                        </ListItem>}
                    {user && isAdmin && 
                        <ListItem
                        component={NavLink}
                        to={'/admin'}
                        sx={{color:'inherit',typography: 'h6',fontWeight:'bold'}}
                       >
                           ADMIN
                       </ListItem>}
                </List>
                
                <Box display='flex' alignItems='center'>
                    {user &&
                    <IconButton component={Link} to='/basket'size='large' edge='start' color='inherit' sx={{mr: 2}}>
                        <Badge color="secondary">
                            <ShoppingCart></ShoppingCart>
                        </Badge>
                    </IconButton>
                    }
                    {user ? (
                        <SignedInMenu/>
                    ):(
                        <List sx={{display:'flex'}}>
                        {rightLinks.map(({title, path})=>(
                            <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={{color:'inherit',typography: 'h6', fontWeight:'bold'}}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}