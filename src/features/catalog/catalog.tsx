/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Icon, InputAdornment, Paper, Radio, RadioGroup, TextField } from "@mui/material";
import { Proizvod } from "../../app/models/proizvod";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { CheckBox } from "@mui/icons-material";
import ProductSearch from "./ProductSearch";
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';





const sortOptions=[
    {value:'naziv', label:'Po alfabetu'},
    {value:'cijena', label:'Po cijeni: Od najnize ka najvisoj'},
    {value:'cijenaDesc',label:'Po cijeni: Od najvise ka najnizoj'}
]

export default function Catalog(){
    const [products, setProducts] = useState<Proizvod[]>([]);
    const[loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState('naziv'); // Set the default sorting parameter

    /*const[filters, setFilters]=useState({
        kategorije:[],
        vrste:[],
    })*/

    
    const loadProducts=()=>{
        /*const queryParams = searchTerm ? `?searchTerm=${encodeURIComponent(searchTerm)}` : '';
        const sortParam = sortBy ? `&orderBy=${encodeURIComponent(sortBy)}` : '';*/
        let queryParams = '';

        if (searchTerm) {
          queryParams += `searchTerm=${encodeURIComponent(searchTerm)}&`;
        }
      
        if (sortBy) {
          queryParams += `orderBy=${encodeURIComponent(sortBy)}&`;
        }
      
        queryParams = queryParams.slice(0, -1);
      
        const url = queryParams ? `?${queryParams}` : 'proizvodi';
        
        agent.Catalog.listSearch(undefined,undefined,undefined,undefined,url)
      .then(products => {
        setProducts(products)
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    }
    const loadAllProducts = () => {
        const orderByParam = sortBy ? `?orderBy=${encodeURIComponent(sortBy)}` : '';
        agent.Catalog.listSearch(undefined,undefined,undefined,undefined,orderByParam).then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(()=>setLoading(false))
      };
    useEffect(()=> {
       if(searchTerm)
       {
        loadProducts()
       } else {
        loadAllProducts()
       }
       
       /*agent.Filters.filteri().then(filteri => setFilters(filteri))
       .catch(error => console.log(error))
       .finally(()=>setLoading(false))*/
    },[searchTerm, sortBy])
    if(loading) return <LoadingComponent message="Učitavanje proizvoda..."/>
    return (
        <Grid container spacing={5}>
            <Grid item xs={3}> 
            <Paper>
            <TextField
                label='Pretrazi proizvode'
                variant = 'outlined'
                fullWidth
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
            />
            </Paper>
            <Paper sx={{mb:2, p:2}} style={{marginTop:'25px', marginRight:'75px'}}>
                <FormControl component="fieldset">
                    <FormLabel component = "legend">Sortiraj</FormLabel>
                    <RadioGroup value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        {sortOptions.map(({value,label})=>(
                                <FormControlLabel value={value} control={<Radio
                                    icon={<Icon><SortIcon /></Icon>}
                                    checkedIcon={<Icon><SortIcon /></Icon>}
                                  />} label={label} key={value} />
                        ))}
                    </RadioGroup>   
                </FormControl>
            </Paper>
            </Grid>
            <Grid item xs={9}> 
            <ProductList products={products}/>
            </Grid>
        </Grid>
    )
}