import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function AboutPage(){
    return(
        <Container>
            <Typography gutterBottom variant = 'h2'>
                Errors for testing purposes
            </Typography>
            <ButtonGroup fullWidth>
                <Button variant = 'contained' onClick={()=>agent.TestErrors.get400Error()}>Test 400 Error</Button>
            </ButtonGroup>
        </Container>
    )
}