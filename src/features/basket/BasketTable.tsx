import { Remove, Add, Delete } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, IconButton, tableCellClasses, TableCell, styled } from "@mui/material";
import { useState } from "react";
import { StavkeKorpe } from "../../app/models/korpa";

interface Props{
    items: StavkeKorpe[];
    isBasket?:boolean;
}

export default function BasketTable({items, isBasket = true}:Props){
    const [basket, setBasket] = useState<StavkeKorpe []>([]);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: 'Purple',
          color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
          <TableRow>
            <StyledTableCell style={{height:'25px', fontWeight:"bold", fontFamily:'Old Standard TT'}}>NAZIV PROIZVODA</StyledTableCell>
            <StyledTableCell align="center" style={{width:'25px',fontWeight:'bold', fontFamily:'Old Standard TT'}}>KOLICINA</StyledTableCell>
            <StyledTableCell align="right" style={{fontWeight:"bold",fontFamily:'Old Standard TT'}}>CIJENA</StyledTableCell>
            <StyledTableCell align="right" style={{fontWeight:"bold",fontFamily:'Old Standard TT'}}>UKLONI</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
           {items.map((item, index)=>(
            <>
            <StyledTableRow key={index}>
            <StyledTableCell component="th" scope="row" style={{fontWeight:"bold", fontFamily:'Old Standard TT'}}>
              {item.naziv}
            </StyledTableCell>
            <StyledTableCell align="right" style={{fontWeight:"bold",fontFamily:'Old Standard TT'}}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton color='error' style={{marginRight:'4px'}}>
                <Remove/>
              </IconButton>
                  <h3>{item.kolicina}</h3>
              <IconButton color='success' style={{marginLeft:'4px'}} >
                <Add/>
              </IconButton>
              </div>
            </StyledTableCell>
            <StyledTableCell align="right" style={{fontWeight:"bold",fontFamily:'Old Standard TT'}}>{item.cijena}</StyledTableCell>
            <StyledTableCell align="right">
              <IconButton color='error' >
                <Delete/>
              </IconButton>
            </StyledTableCell>
          </StyledTableRow>
            </>
           ))}
           </TableBody>
        </Table>
        </TableContainer>
}