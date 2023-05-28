import { Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { createValidationSchema, updateValidationSchema } from "./productValidation";
import { KorisnikAdminUpdate } from "../../app/models/user";
import UserForm from "./UserForm";
import { PakovanjeUpdate } from "../../app/models/pakovanje";
import ProductForm from "./ProductForm";
import PackageForm from "./PackageForm";
import { KategorijaUpdate } from "../../app/models/kategorija";
import CategoryForm from "./CategoryForm";


export default function Kategorije() {
    const[loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [kategorije, setKategorije] = useState<KategorijaUpdate []>([]);
    const [selectedKategorija, setSelectedKategorija] = useState<KategorijaUpdate | undefined>(undefined);
    const [showTable, setShowTable] = useState(true);
    const [target, setTarget] = useState(0);
    //const [selectedPakovanje, setSelectedPakovanje] = useState<Pako

    //const [errors, setErrors] = useState(FieldErrors<Proizvod>)
    function toggleTable() {
        setShowTable(!showTable);
      }
    function handleSelectKategorija(kategorija: KategorijaUpdate){
        setSelectedKategorija(kategorija);
        setEditMode(true);
    }
    function handleDeleteKategorija(id:number){
        setLoading(true);
        setTarget(id);
        agent.Categories.deleteCategory(id)
        .then(()=>{
            setKategorije(prevKategorija => prevKategorija.filter(kategorija => kategorija.kategorijaId !== id));
        })
        .catch(error=>console.log(error))
        .finally(() => {
            setLoading(false);
          });
    }

    function cancelEdit(){
        if(selectedKategorija) setSelectedKategorija(undefined);
        setEditMode(false);
    }

    useEffect(()=> {
       agent.Categories.getAllCategories().then((kategorije:any)=> setKategorije(kategorije))
       .catch((error:any) => console.log(error))
    }, [])

    if(editMode) return <CategoryForm kategorija={selectedKategorija} cancelEdit={cancelEdit}/>

    if(loading) return <LoadingComponent message="Učitavanje..."/>
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>KATEGORIJA</Typography>
                <Button onClick={toggleTable} sx={{ m: 2 }} size='large' variant='contained' style={{color:'white', backgroundColor:'#90EE90'}}>
                {showTable ? 'Sakrij' : 'Prikaži'} kategorije
                </Button>
                <Button onClick={()=> setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained' style={{color:'white', backgroundColor:'#90EE90'}}>Dodaj</Button>
            </Box>
            {showTable &&
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">KategorijaId</TableCell>
                            <TableCell align="right">Naziv</TableCell>
                            <TableCell align="right">Opis</TableCell>
                            <TableCell align="right">Akcije</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {kategorije.map((kategorija) => (
                            <TableRow
                                key={kategorija.kategorijaId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {kategorija.kategorijaId}
                                </TableCell>
                                <TableCell align="right">{kategorija.naziv}</TableCell>
                                <TableCell align="center">{kategorija.opis}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={()=>handleSelectKategorija(kategorija)} startIcon={<Edit />} />
                                    <Button startIcon={<Delete />} color='error' onClick={()=>handleDeleteKategorija(kategorija.kategorijaId)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    )
}