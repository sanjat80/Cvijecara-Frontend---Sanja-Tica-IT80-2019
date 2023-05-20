import { Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps{
    label:string;
    items:number[]
}

export default function AppSelectList(props:Props)
{
    const {fieldState, field} = useController({...props, defaultValue:''})
    return (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel>{props.label}</InputLabel>
            <Select
              value={field.value}
              label={props.label}
              onChange={field.onChange}
            >
                {props.items.map((item, index)=>(
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        </Box>
      );
}