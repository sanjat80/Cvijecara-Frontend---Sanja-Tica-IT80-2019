import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, Radio, RadioGroup, TextField } from "@mui/material";
import { Proizvod } from "../../app/models/proizvod";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { CheckBox } from "@mui/icons-material";
import ProductSearch from "./ProductSearch";

const sortOptions=[
    {value:'naziv', label:'Po alfabetu'},
    {value:'cijena', label:'Po cijeni: Od najnize ka najvisoj'},
    {value:'cijenaDesc',label:'Po cijeni: Od najvise ka najnizoj'}
]

export default function Catalog(){
    const [products, setProducts] = useState<Proizvod[]>([]);
    const[loading, setLoading] = useState(true);
    const[filters, setFilters]=useState({
        kategorije:[],
        vrste:[]
    })
    useEffect(()=> {
       agent.Catalog.list().then(products => setProducts(products))
       .catch(error => console.log(error))
       .finally(()=>setLoading(false))
       agent.Filters.filteri().then(filteri => setFilters(filteri))
       .catch(error => console.log(error))
       .finally(()=>setLoading(false))
    }, [])
    if(loading) return <LoadingComponent message="Učitavanje proizvoda..."/>
    return (
        <Grid container spacing={4}>
            <Grid item xs={3}> 
            <Paper sx={{mb:2}}>
                <ProductSearch/>
            </Paper>
            <Paper sx={{mb:2, p:2}}>
                <FormControl component="fieldset">
                    <FormLabel component = "legend">Sortiraj</FormLabel>
                    <RadioGroup>
                        {sortOptions.map(({value,label})=>(
                                <FormControlLabel value={value} control={<Radio/>} label={label} key={value}/>
                        ))}
                    </RadioGroup>   
                </FormControl>
            </Paper>
            <Paper sx={{mb:2, p:2}}>
                <FormGroup>
                    {filters.kategorije.map(kategorija=>(
                                            <FormControlLabel control={<Checkbox defaultChecked />} label={kategorija} key={kategorija}/>
                    ))}
                </FormGroup>
            </Paper>
            <Paper sx={{mb:2, p:2}}>
                <FormGroup>
                    {filters.vrste.map(vrsta=>(
                                            <FormControlLabel control={<Checkbox defaultChecked />} label={vrsta} key={vrsta}/>
                    ))}
                </FormGroup>
            </Paper>
            </Grid>
            <Grid item xs={9}> 
            <ProductList products={products}/>
            </Grid>
        </Grid>
    )
}