import { Grid, List } from "@mui/material";
import { Proizvod } from "../../app/models/proizvod";
import ProductsCard from "./ProductCard";

interface Props{
    products: Proizvod[];
    sortBy: string;
}

export default function ProductList({products, sortBy}:Props){
  const sortedProducts = Array.isArray(products) && products.length > 0
  ? products.slice().sort((a, b) => {
        if (sortBy === "cijena") {
          return a.cijena - b.cijena;
        } else if (sortBy === "cijenaDesc") {
          return b.cijena - a.cijena;
        } else {
          // Default sort by name (naziv)
          return a.naziv.localeCompare(b.naziv);
        }
      }) : [];
    return(
        <Grid container spacing={4}>
                { sortedProducts.map((product,index)=> (
                    <Grid item xs={12} sm={6} md={4} key={product.naziv}>
                    <ProductsCard product={product} index={index}/>
                    </Grid>
                ))}
        </Grid>
    )
}