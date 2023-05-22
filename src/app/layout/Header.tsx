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
        // Retrieve the user object from localStorage
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          // Convert the JSON string to a JavaScript object
          const parsedUser = JSON.parse(storedUser);
          const token = parsedUser.data.token;
          const decoded = jwtDecode<decodedToken>(token);
          const role = decoded.role;
          if(role === 'admin')
          {
            setIsAdmin(true)
          } 
          setIsAdmin(false);
          
          // Dispatch an action to update the user in the Redux store
          dispatch(setUser(parsedUser));
        }
    }, [dispatch]);

    return (
        <AppBar position="static" sx={{ backgroundColor: "#CBC3E3", color: "white", fontFamily: "Old Standard TT", mb: 6 }}>
            <Toolbar sx={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
                <Box display='flex' alignItems='center'>
                <Typography variant='h6' component={NavLink} 
                to='/'
                sx={{color:'inherit',textDecoration:'none', fontFamily:'Old Standard TT', fontWeight:'bold'}}
                >
                    BOTANIKO 
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange}/>
                </Box>
                <List sx={{display:'flex',fontFamily:'Old Standard TT'}}>
                    {midLinks.map(({title, path})=>(
                        <ListItem
                         component={NavLink}
                         to={path}
                         key={path}
                         sx={{color:'inherit',typography: 'h6', fontFamily:'Old Standard TT',fontWeight:'bold'}}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                    {user && 
                    <ListItem
                         component={NavLink}
                         to={'/inventory'}
                         sx={{color:'inherit',typography: 'h6', fontFamily:'Old Standard TT',fontWeight:'bold'}}
                        >
                            INVENTAR
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
                        <List sx={{display:'flex', fontFamily:'Old Standard TT'}}>
                        {rightLinks.map(({title, path})=>(
                            <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={{color:'inherit',typography: 'h6', fontFamily:'Old Standard TT', fontWeight:'bold'}}
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