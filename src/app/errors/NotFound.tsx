import { Button, Container, Divider, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function NotFound(){
    return(
       <>
            <Typography gutterBottom variant = 'h3' style={{color:'purple'}} textTransform='uppercase'>Oops - nismo uspjeli da pronađemo traženu stranicu...</Typography>
            <img src='/images/sad.png' alt='sad' style={{ width: '30%', height: '30%', marginLeft:'420px', marginTop:'60px',marginBottom:'30px' }}></img>
            <Divider/>
            <Button component={Link} to='/catalog' style={{color:'white',backgroundColor:'purple', marginTop:'46px', marginLeft:'480px'}}>Vrati se nazad u prodavnicu</Button>
        </>
    )
}