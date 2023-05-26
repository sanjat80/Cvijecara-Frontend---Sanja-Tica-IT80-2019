export interface Korisnik {
    token:string
    expires: string
    korisnickoIme:string
}

export interface TrenutniKorisnik{
    token:string
    korisnickoIme: string
    korpaId:number
}

export interface KorisnikRegistration{
    ime: string
    prezime:string
    adresa:string
    brojTelefona:string
    korisnickoIme:string
    email:string
    lozinka:string
}

export interface KorisnikProfile{
    id: number,
    ime: string
    prezime:string
    adresa:string
    brojTelefona:string
    korisnickoIme:string
    email:string
    lozinka:string
}

export interface KorisnikAdminUpdate{
    korisnikId: number,
    ime: string
    prezime:string
    adresa:string
    brojTelefona:string
    statusKorisnika:string
    korisnickoIme:string
    email:string
    lozinka:string
    tipId: number
}
export interface KorisnikAdminCreate{
    ime: string
    prezime:string
    adresa:string
    brojTelefona:string
    statusKorisnika:string
    korisnickoIme:string
    email:string
    lozinka:string
    tipId: number
}