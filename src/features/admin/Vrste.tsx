import { Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { VrstaUpdate } from "../../app/models/vrsta";
import TypeForm from "./TypeForm";


export default function Vrste() {
    const[loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [vrste, setVrste] = useState<VrstaUpdate []>([]);
    const [selectedVrsta, setSelectedVrsta] = useState<VrstaUpdate | undefined>(undefined);
    const [showTable, setShowTable] = useState(true);
    const [target, setTarget] = useState(0);
    function toggleTable() {
        setShowTable(!showTable);
      }
    function handleSelectVrsta(vrsta: VrstaUpdate){
        setSelectedVrsta(vrsta);
        setEditMode(true);
    }
    function handleDeleteVrsta(id:number){
        setLoading(true);
        setTarget(id);
        agent.Type.deleteVrsta(id)
        .then(()=>{
            setVrste(prevVrsta => prevVrsta.filter(vrsta => vrsta.vrstaId !== id));
        })
        .catch(error=>console.log(error))
        .finally(() => {
            setLoading(false);
          });
    }

    function cancelEdit(){
        if(selectedVrsta) setSelectedVrsta(undefined);
        setEditMode(false);
    }

    useEffect(()=> {
       agent.Type.getAllVrste().then((vrste:any)=> setVrste(vrste))
       .catch((error:any) => console.log(error))
    }, [])

    if(editMode) return <TypeForm vrsta={selectedVrsta} cancelEdit={cancelEdit}/>

    if(loading) return <LoadingComponent message="Učitavanje..."/>
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>VRSTA</Typography>
                <Button onClick={toggleTable} sx={{ m: 2 }} size='large' variant='contained' style={{color:'white', backgroundColor:'#90EE90'}}>
                {showTable ? 'Sakrij' : 'Prikaži'} vrste
                </Button>
                <Button onClick={()=> setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained' style={{color:'white', backgroundColor:'#90EE90'}}>Dodaj</Button>
            </Box>
            {showTable &&
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">VrstaId</TableCell>
                            <TableCell align="right">Naziv</TableCell>
                            <TableCell align="right">Akcije</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vrste.map((vrsta) => (
                            <TableRow
                                key={vrsta.vrstaId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {vrsta.vrstaId}
                                </TableCell>
                                <TableCell align="right">{vrsta.naziv}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={()=>handleSelectVrsta(vrsta)} startIcon={<Edit />} />
                                    <Button startIcon={<Delete />} color='error' onClick={()=>handleDeleteVrsta(vrsta.vrstaId)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    )
}