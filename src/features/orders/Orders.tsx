import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Porudzbina } from "../../app/models/order";

export default function Orders(){
    const[orders,setOrders]=useState<Porudzbina[] | null>(null);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        setLoading(true);
        agent.Order.getAllPorudzbinaFromCurrentUser()
        .then(orders=>setOrders(orders))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false))
    },[])

    if(loading) return <LoadingComponent message='Ucitavanje porudzbina...'/>
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Redni broj porudzbine</TableCell>
                <TableCell align="right">Datum kreiranja</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Racun</TableCell>
                <TableCell align="right">Popust</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow
                  key={order.porudzbinaId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order.redniBroj}
                  </TableCell>
                  <TableCell align="right">{order.datumKreiranja}</TableCell>
                  <TableCell align="right">{order.statusPorudzbine}</TableCell>
                  <TableCell align="right">{order.racun}</TableCell>
                  <TableCell align="right">{order.popust}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}