import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError(){
    const {state} = useLocation();
    return(
        <Container component={Paper}>
            {state?.error? (
                <>
                <Typography gutterBottom variant = 'h5'>
                    {state.error.title}
                </Typography>
                <Divider/>
                <Typography variant="body1">{state.error.detail}</Typography>
                </>
            ):(
                <Typography variant='h5'>Internal server error</Typography>
            )}
        </Container>
    )
}