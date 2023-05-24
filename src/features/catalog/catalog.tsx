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
    const [selectedKategorija, setSelectedKategorija] = useState<string | null>(null);
    const [selectedVrsta, setSelectedVrsta] = useState<string | null>(null);
    const[filters, setFilters]=useState({
        kategorije:[],
        vrste:[],
    })

    const buildQueryParams = () => {
      const queryParams = new URLSearchParams();
    
      if (searchTerm) {
        queryParams.append("searchTerm", searchTerm);
      }
    
      if (selectedKategorija) {
        queryParams.append("kategorija", selectedKategorija);
      }
    
      if (selectedVrsta) {
        queryParams.append("vrsta", selectedVrsta);
      }
    
      // Dodajte sortiranje u queryParams
      queryParams.append("orderBy", sortBy);
    
      return queryParams;
    };
    

    
    /*const loadProducts=()=>{
        /*const queryParams = searchTerm ? `?searchTerm=${encodeURIComponent(searchTerm)}` : '';
        const sortParam = sortBy ? `&orderBy=${encodeURIComponent(sortBy)}` : '';
        const queryParams = buildQueryParams();
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
    }*/
    const loadProducts = () => {
      const queryParams = new URLSearchParams();
    
      if (searchTerm) {
        queryParams.append("searchTerm", searchTerm);
      }
    
      if (selectedKategorija) {
        queryParams.append("kategorija", selectedKategorija);
      }
    
      if (selectedVrsta) {
        queryParams.append("vrsta", selectedVrsta);
      }
    
      queryParams.append("orderBy", sortBy);
    
      const url = queryParams ? `?${queryParams}` : 'proizvodi';
    
      agent.Catalog.listSearch(undefined, undefined, undefined, undefined, url)
        .then((products) => {
          setProducts(products);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const filterName = event.target.name;
      const filterValue = event.target.value;
    
      if (filterName === "kategorija") {
        setSelectedKategorija((prevValue) =>
          prevValue === filterValue ? null : filterValue
        );
      } else if (filterName === "vrsta") {
        setSelectedVrsta((prevValue) =>
          prevValue === filterValue ? null : filterValue
        );
      }
      loadProducts();
    };
    
    /*const handleKategorijaFilterChange = (kategorija: string, checked: boolean) => {
      if (checked) {
        setSelectedKategorije((prevSelected) => [...prevSelected, kategorija]);
      } else {
        setSelectedKategorije((prevSelected) =>
          prevSelected.filter((selected) => selected !== kategorija)
        );
      }
    };
    
    const handleVrstaFilterChange = (vrsta: string, checked: boolean) => {
      if (checked) {
        setSelectedVrste((prevSelected) => [...prevSelected, vrsta]);
      } else {
        setSelectedVrste((prevSelected) =>
          prevSelected.filter((selected) => selected !== vrsta)
        );
      }
    };*/
    const loadAllProducts = () => {
        const orderByParam = sortBy ? `?orderBy=${encodeURIComponent(sortBy)}` : '';
        agent.Catalog.listSearch(undefined,undefined,undefined,undefined,orderByParam).then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(()=>setLoading(false))
      };
    useEffect(()=> {
       loadProducts();
       agent.Filters.filteri().then(filteri => setFilters(filteri))
       .catch(error => console.log(error))
       .finally(()=>setLoading(false))
    },[searchTerm, sortBy, selectedKategorija, selectedVrsta])
    useEffect(() => {
      loadProducts();
    }, [selectedKategorija, selectedVrsta]);
    
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
            <Paper sx={{mb:2, p:2}}>
                <FormGroup>
                    {filters.kategorije.map(kategorija=>(
                                            <FormControlLabel
                                            key={kategorija}
                                            control={
                                              <Checkbox
                                                checked={selectedKategorija === kategorija}
                                                onChange={handleFilterChange}
                                                name="kategorija"
                                                value={kategorija}
                                              />
                                            }
                                            label={kategorija}
                                          />
                    ))}
                </FormGroup>
            </Paper>
            <Paper sx={{mb:2, p:2}}>
                <FormGroup>
                    {filters.vrste.map(vrsta=>(
                                            <FormControlLabel
                                            key={vrsta}
                                            control={
                                              <Checkbox
                                                checked={selectedVrsta === vrsta}
                                                onChange={handleFilterChange}
                                                name="vrsta"
                                                value={vrsta}
                                              />
                                            }
                                            label={vrsta}
                                          />
                    ))}
                </FormGroup>
            </Paper>
            </Grid>
            <Grid item xs={9}> 
            <ProductList products={products}  sortBy={sortBy}/>
            </Grid>
        </Grid>
    )
}