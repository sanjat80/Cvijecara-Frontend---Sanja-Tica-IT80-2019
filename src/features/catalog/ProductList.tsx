import { Grid, List } from "@mui/material";
import { Proizvod } from "../../app/models/proizvod";
import ProductsCard from "./ProductCard";

interface Props{
    products: Proizvod[];
}

export default function ProductList({products}:Props){
    return(
        <Grid container spacing={4}>
                { products && products.map((product,index)=> (
                    <Grid item xs={4} key={product.naziv}>
                    <ProductsCard product={product} index={index}/>
                    </Grid>
                ))}
        </Grid>
    )
}