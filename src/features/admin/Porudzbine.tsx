import { Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Porudzbina } from "../../app/models/order";


export default function Porudzbine() {
    const [orders, setOrders] = useState<Porudzbina[]>([]);
    const[loading, setLoading] = useState(false);
    const [showTable, setShowTable] = useState(true);
    
    function toggleTable() {
        setShowTable(!showTable);
      }

    useEffect(()=> {
       agent.Order.getAllPorudzbine().then((orders:any) => setOrders(orders))
       .catch((error:any) => console.log(error))
       .finally(()=>setLoading(false));
    }, [])

   
    if(loading) return <LoadingComponent message="Učitavanje..."/>
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>PORUDZBINE</Typography>
                <Button onClick={toggleTable} sx={{ m: 2 }} size='large' variant='contained' style={{color:'white', backgroundColor:'#90EE90'}}>
                {showTable ? 'Sakrij' : 'Prikaži'} porudzbine
                </Button>
            </Box>
            {showTable &&
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">PorudzbinaId</TableCell>
                            <TableCell align="right">Redni broj</TableCell>
                            <TableCell align="right">Datum kreiranja</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Racun</TableCell>
                            <TableCell align="center">Popust</TableCell>
                            <TableCell align="center">Payment Intent Id</TableCell>
                            <TableCell align="center">Client Secret</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow
                                key={order.porudzbinaId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.porudzbinaId}
                                </TableCell>
                                <TableCell align="right">{order.redniBroj}</TableCell>
                                <TableCell align="center">{order.datumKreiranja}</TableCell>
                                <TableCell align="center">{order.statusPorudzbine}</TableCell>
                                <TableCell align="center">{order.racun}</TableCell>
                                <TableCell align="center">{order.popust}</TableCell>
                                <TableCell align="center">{order.paymentIntentId}</TableCell>
                                <TableCell align="center">{order.clientSecret}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    )
}