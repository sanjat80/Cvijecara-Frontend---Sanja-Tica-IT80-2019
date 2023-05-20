import { Button } from "@mui/material";
import { Proizvod } from "../../app/models/proizvod";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";


export default function Catalog(){
    const [products, setProducts] = useState<Proizvod[]>([]);
    const[loading, setLoading] = useState(true);
    useEffect(()=> {
       agent.Catalog.list().then(products => setProducts(products))
       .catch(error => console.log(error))
       .finally(()=>setLoading(false))
    }, [])
    if(loading) return <LoadingComponent message="Učitavanje proizvoda..."/>
    return (
        <>
            <ProductList products={products}/>
        </>
    )
}