export interface PakovanjeCreation{
    vrsta:string;
    cijena:number;
    valuta:string;
    ukrasi:string;
    posveta:string;
}

export interface PakovanjeUpdate{
    pakovanjeId: number;
    vrsta:string;
    cijena:number;
    valuta:string;
    ukrasi:string;
    posveta:string;
}