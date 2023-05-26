import { Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { createValidationSchema, updateValidationSchema } from "./productValidation";
import { KorisnikAdminUpdate } from "../../app/models/user";
import UserForm from "./UserForm";


export default function Admin() {
    const [users, setUsers] = useState<KorisnikAdminUpdate[]>([]);
    const[loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState<KorisnikAdminUpdate| undefined>(undefined);
    const [tipovi, setTipovi] = useState<number[]>([]);
    const [showTable, setShowTable] = useState(true);

    //const [errors, setErrors] = useState(FieldErrors<Proizvod>)
    const [target, setTarget] = useState(0);
    let validationSchema;
    function toggleTable() {
        setShowTable(!showTable);
      }

    function handleSelectUser(user: KorisnikAdminUpdate){
        setSelectedUser(user);
        setEditMode(true);
    }
    function handleDeleteUser(id:number){
        setLoading(true);
        setTarget(id);
        agent.User.deleteUser(id)
        .then(()=>{
            setUsers(prevUsers => prevUsers.filter(user => user.korisnikId !== id));
        })
        .catch(error=>console.log(error))
        .finally(() => {
            setLoading(false);
          });
    }

    function cancelEdit(){
        if(selectedUser) setSelectedUser(undefined);
        setEditMode(false);
    }

    useEffect(()=> {
       agent.User.getAllusers().then((users:any) => setUsers(users))
       .catch((error:any) => console.log(error))
       .finally(()=>setLoading(false));
       agent.User.getAllType()
       .then((typesData:number[])=>{
        setTipovi(typesData);
       })
    }, [])

    if(editMode) return <UserForm user={selectedUser} cancelEdit={cancelEdit} tipovi={tipovi}/>

    if(loading) return <LoadingComponent message="Učitavanje..."/>
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>KORISNICI</Typography>
                <Button onClick={toggleTable} sx={{ m: 2 }} size='large' variant='contained'>
                {showTable ? 'Sakrij' : 'Prikaži'} korisnike
                </Button>
                <Button onClick={()=> setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Dodaj</Button>
            </Box>
            {showTable &&
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">KorisnikId</TableCell>
                            <TableCell align="right">Ime</TableCell>
                            <TableCell align="right">Prezime</TableCell>
                            <TableCell align="center">Adresa</TableCell>
                            <TableCell align="center">Broj telefona</TableCell>
                            <TableCell align="center">Status korisnika</TableCell>
                            <TableCell align="center">Korisnicko ime</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="right">Tip korisnika</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.korisnikId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.korisnikId}
                                </TableCell>
                                <TableCell align="right">{user.ime}</TableCell>
                                <TableCell align="center">{user.prezime}</TableCell>
                                <TableCell align="center">{user.adresa}</TableCell>
                                <TableCell align="center">{user.brojTelefona}</TableCell>
                                <TableCell align="center">{user.statusKorisnika}</TableCell>
                                <TableCell align="center">{user.korisnickoIme}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.tipId}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={()=>handleSelectUser(user)} startIcon={<Edit />} />
                                    <Button startIcon={<Delete />} color='error' onClick={()=>handleDeleteUser(user.korisnikId)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>KORISNICI</Typography>
                <Button onClick={()=> setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Dodaj</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">KorisnikId</TableCell>
                            <TableCell align="right">Ime</TableCell>
                            <TableCell align="right">Prezime</TableCell>
                            <TableCell align="center">Adresa</TableCell>
                            <TableCell align="center">Broj telefona</TableCell>
                            <TableCell align="center">Status korisnika</TableCell>
                            <TableCell align="center">Korisnicko ime</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="right">Tip korisnika</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.korisnikId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.korisnikId}
                                </TableCell>
                                <TableCell align="right">{user.ime}</TableCell>
                                <TableCell align="center">{user.prezime}</TableCell>
                                <TableCell align="center">{user.adresa}</TableCell>
                                <TableCell align="center">{user.brojTelefona}</TableCell>
                                <TableCell align="center">{user.statusKorisnika}</TableCell>
                                <TableCell align="center">{user.korisnickoIme}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.tipId}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={()=>handleSelectUser(user)} startIcon={<Edit />} />
                                    <Button startIcon={<Delete />} color='error' onClick={()=>handleDeleteUser(user.korisnikId)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}