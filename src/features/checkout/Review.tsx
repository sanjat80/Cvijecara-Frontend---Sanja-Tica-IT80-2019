import * as React from 'react';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { TableCell, tableCellClasses, TableRow, TableContainer, Paper, Table, TableHead, TableBody} from '@mui/material';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import { StavkeKorpe } from '../../app/models/korpa';





const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'White',
    color: 'Black'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'white',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Review() {
  const [basket, setBasket] = useState<StavkeKorpe []>([]);
  const [loading, setLoading] = useState(true);

  const totalPrice = basket.reduce((acc, item) => {
    const itemTotalPrice = item.cijena;
    return acc + itemTotalPrice;
  }, 0);

  useEffect(()=>{
    agent.Basket.getKorpaFromCurrentUser()
    .then((basket:any) => setBasket(basket))
    .catch((error:any) => console.log(error))
    .finally(()=> setLoading(false))
},[])
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead>
          <TableRow>
            <StyledTableCell style={{height:'25px', fontWeight:"bold", fontFamily:'Old Standard TT'}}>NAZIV PROIZVODA</StyledTableCell>
            <StyledTableCell align="center" style={{width:'25px',fontWeight:'bold', fontFamily:'Old Standard TT'}}>KOLICINA</StyledTableCell>
            <StyledTableCell align="right" style={{fontWeight:"bold",fontFamily:'Old Standard TT'}}>CIJENA</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
           {basket.map((item, index)=>(
            <>
            <StyledTableRow key={index}>
            <StyledTableCell component="th" scope="row" style={{fontWeight:"bold", fontFamily:'Old Standard TT'}}>
              {item.naziv}
            </StyledTableCell>
            <StyledTableCell align="right" style={{fontWeight:"bold",fontFamily:'Old Standard TT'}}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>{item.kolicina}</h3>
              </div>
            </StyledTableCell>
            <StyledTableCell align="right" style={{fontWeight:"bold",fontFamily:'Old Standard TT'}}>{item.cijena}</StyledTableCell>
          </StyledTableRow>
            </>
           ))}
           </TableBody>
        </Table>
        </TableContainer>
        <div>
          <h3 style={{fontWeight:"bold",fontFamily:'Old Standard TT',display: 'inline-block'}}>UKUPN IZNOS VAŠE KORPE: </h3>
          <h3 style={{fontWeight:"bold",fontFamily:'Old Standard TT',marginLeft:'420px'}}> {totalPrice} EUR</h3>
        </div>
    </React.Fragment>
  );
}