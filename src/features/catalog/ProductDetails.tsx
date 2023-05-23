import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Proizvod, ProizvodDetalji } from "../../app/models/proizvod";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

/*interface Product {
    id: string;
    imageFileName: string;
  }*/

export default function ProductDetails(){
    const {id} = useParams<{id: string | undefined}>();
    const[product, setProduct] = useState<ProizvodDetalji | null>(null);
    const [loading, setLoading] = useState(true);
    const imageFilenames = ["bella epoque.jpg", "cherry brandy.jpg", "orhideja.jpg", "crvene lale.jpg", "praline.jpg"];
    const imageIndex = parseInt(id ?? "0") % imageFilenames.length;
    const imageFileName = imageFilenames[imageIndex];
    /*const products: Product[] = [
        { id: 1, imageFileName: "bella epoque.jpg" },
        { id: 2, imageFileName: "cherry brandy.jpg" },
        { id: 3, imageFileName: "crvene lale.jpg" },
        { id: 4, imageFileName:"orhideja.jpg"},
        { id: 5, imageFileName:"praline.jpg"},
        { id: 1, imageFileName: "bella epoque.jpg" },
        { id: 2, imageFileName: "cherry brandy.jpg" },
        { id: 3, imageFileName: "crvene lale.jpg" },
        { id: 4, imageFileName:"orhideja.jpg"},
        {id: 5, imageFileName:"praline.jpg"}

      ];*/

    useEffect(()=>{
        id && agent.Catalog.details(parseInt(id))
        .then(response => setProduct(response))
        .catch(error => console.log(error.response))
        .finally(()=>setLoading(false));
    },[id])

    if(loading) return <LoadingComponent message='Učitavanje proizvoda...'/>

    if(!product) return <h3>Product not found</h3>

    return(
        <Grid container spacing={6}>
            <Grid item xs={6} border={"black"}>
                <img src={`/images/${imageFileName}`} alt={product.naziv} style={{width:'100%', border:'black'}}></img>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3' fontWeight='bold' color='#90EE90'>{product.naziv.toUpperCase()}</Typography>
                <Divider sx={{mb:2}}/>
                <Typography variant = 'h4' color='#90EE90' fontWeight='bold'>{product.cijena} EUR</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', color: 'black' }}>NAZIV</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: 'black' }}>{product.naziv.toUpperCase()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', color: 'black' }}>VELICINA</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: 'black' }}>{product.velicina.toUpperCase()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', color: 'black' }}>KOLICINA NA STANJU</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: 'black' }}>{product.zalihe}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', color: 'black' }}>VRSTA</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: 'black' }}>{product.vrsta}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', color: 'black' }}>KATEGORIJA</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: 'black' }}>{product.kategorija}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', color: 'black' }}>PAKOVANJE</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: 'black' }}>{product.pakovanje}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}