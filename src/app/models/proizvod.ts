export interface Proizvod{
    proizvodId: number;
    naziv : string;
    cijena : number;
    valuta : string;
    velicina : string;
    zalihe: number;
    pakovanjeId: number;
    kategorijaId: number;
    vrstaId: number;
    slika:string;
}

export interface CreateProizvod{
    naziv : string;
    cijena : number;
    valuta : string;
    velicina : string;
    zalihe: number;
    pakovanjeId: number;
    kategorijaId: number;
    vrstaId: number;
    //slika:string;
}

export interface ProizvodDetalji{
    proizvodId: number;
    naziv : string;
    cijena : number;
    valuta : string;
    velicina : string;
    zalihe: number;
    pakovanje: number;
    kategorija: number;
    vrsta: number;
    slika:string;
}

export interface ProductParams{
    orderBy:string;
    searchTerm?: string;
    kategorija?:string[];
    vrsta?:string[];
}