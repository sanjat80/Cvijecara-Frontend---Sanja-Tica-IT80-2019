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