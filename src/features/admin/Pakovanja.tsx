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


export default function Pakovanja() {
    const[loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [pakovanja, setPakovanja] = useState<PakovanjeUpdate []>([]);
    const [selectedPakovanje, setSelectedPakovanje] = useState<PakovanjeUpdate | undefined>(undefined);
    const [showTable, setShowTable] = useState(true);
    const [target, setTarget] = useState(0);
    //const [selectedPakovanje, setSelectedPakovanje] = useState<Pako

    //const [errors, setErrors] = useState(FieldErrors<Proizvod>)
    function toggleTable() {
        setShowTable(!showTable);
      }
    function handleSelectPakovanje(pakovanje: PakovanjeUpdate){
        setSelectedPakovanje(pakovanje);
        setEditMode(true);
    }
    function handleDeletePakovanje(id:number){
        setLoading(true);
        setTarget(id);
        agent.Package.deletePakovanje(id)
        .then(()=>{
            setPakovanja(prevPakovanja => prevPakovanja.filter(pakovanje => pakovanje.pakovanjeId !== id));
        })
        .catch(error=>console.log(error))
        .finally(() => {
            setLoading(false);
          });
    }

    function cancelEdit(){
        if(selectedPakovanje) setSelectedPakovanje(undefined);
        setEditMode(false);
    }

    useEffect(()=> {
       agent.Package.getPakovanje().then((pakovanja:any)=> setPakovanja(pakovanja))
       .catch((error:any) => console.log(error))
    }, [])

    if(editMode) return <PackageForm pakovanje={selectedPakovanje} cancelEdit={cancelEdit}/>

    if(loading) return <LoadingComponent message="Učitavanje..."/>
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>PAKOVANJE</Typography>
                <Button onClick={toggleTable} sx={{ m: 2 }} size='large' variant='contained' style={{color:'white', backgroundColor:'#90EE90'}}>
                {showTable ? 'Sakrij' : 'Prikaži'} pakovanja
                </Button>
                <Button onClick={()=> setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained' style={{color:'white', backgroundColor:'#90EE90'}}>Dodaj</Button>
            </Box>
            {showTable &&
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">PakovanjeId</TableCell>
                            <TableCell align="right">Vrsta</TableCell>
                            <TableCell align="right">Cijena</TableCell>
                            <TableCell align="center">Valuta</TableCell>
                            <TableCell align="center">Ukrasi</TableCell>
                            <TableCell align="center">Posveta</TableCell>
                            <TableCell align="right">Akcije</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pakovanja.map((pakovanje) => (
                            <TableRow
                                key={pakovanje.pakovanjeId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {pakovanje.pakovanjeId}
                                </TableCell>
                                <TableCell align="right">{pakovanje.vrsta}</TableCell>
                                <TableCell align="center">{pakovanje.cijena}</TableCell>
                                <TableCell align="center">{pakovanje.valuta}</TableCell>
                                <TableCell align="center">{pakovanje.ukrasi}</TableCell>
                                <TableCell align="center">{pakovanje.posveta}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={()=>handleSelectPakovanje(pakovanje)} startIcon={<Edit />} />
                                    <Button startIcon={<Delete />} color='error' onClick={()=>handleDeletePakovanje(pakovanje.pakovanjeId)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    )
}