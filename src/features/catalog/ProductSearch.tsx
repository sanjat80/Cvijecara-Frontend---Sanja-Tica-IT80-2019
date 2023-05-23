import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import agent from "../../app/api/agent";
import { Proizvod } from "../../app/models/proizvod";

export default function ProductSearch(){
    return(
      <>
        <TextField
                label='Pretrazi proizvode'
                variant = 'outlined'
                fullWidth
        />
    </>
    )
}