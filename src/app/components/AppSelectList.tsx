import { Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { FieldErrors, UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps{
    label:string;
    items:number[];
    defaultValue?:string
}

export default function AppSelectList(props:Props)
{
    const {field} = useController(props)
    const { label, items} = props;
    return (
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth >
        <InputLabel>{label}</InputLabel>
        <Select
          {...field}
          label={label}
          onChange={(e) => field.onChange(e.target.value)}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
      );
}