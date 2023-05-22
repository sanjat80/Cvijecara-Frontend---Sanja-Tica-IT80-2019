import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import agent from "../../app/api/agent";

export default function ProductSearch(){
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get('search');
        const sortParam = searchParams.get('sort');
        const filterParam = searchParams.get('filter');

        const productParams = {
            orderBy: sortParam,
            searchTerm: searchTerm,
            types: filterParam ? filterParam.split(',') : [],
            brands: [] // Dodajte logiku za dobivanje brendova ako je potrebno
          };
    
        if (searchTerm) {
        }
      }, [location.search]);
    return(
        <TextField
                label='Pretrazi proizvode'
                variant = 'outlined'
                fullWidth
        />
    )
}