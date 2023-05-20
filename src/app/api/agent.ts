import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../router/Routes";
import { store } from "../store/configureStore";
import { url } from "inspector";
import { Proizvod } from "../models/proizvod";

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

axios.defaults.baseURL = 'http://localhost:5299/api/';

const user = localStorage.getItem('user');
const token = user ? JSON.parse(user).data.token : '';
const defaultHeaders = {
  'Authorization': `Bearer ${token}`
};
const responseBody = (response :AxiosResponse) => response.data;


axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(response => {
    sleep();
    return response
}, (error: AxiosError) => {
    if(error.response){
    const {data, status} = error.response as AxiosResponse;
    switch(status){
        case 400:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for(const key in data.errors)
                {
                    if(data.errors[key]){
                        modelStateErrors.push(data.erros[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 403:
            toast.error(status+ " Niste autorizovani da obavite ovu akciju!");
            break;
        case 404:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for(const key in data.errors)
                {
                    if(data.errors[key]){
                        modelStateErrors.push(data.erros[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            router.navigate('/not-found', {state: {error: data}});
            console.log(toast.error)
            break;
        /*case 409:
            toast.error(data)
            break;*/
        case 500:
            router.navigate('/server-error', {state: {error: data}});
            break;
        default:
            break;
        }       
    }
    return Promise.reject(error);
})

export const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body:{}) => axios.post(url, body).then(responseBody),
    put: (url: string, body:{}) => axios.put(url,body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postOrder: (url:string) => axios.post(url).then(responseBody),
    putProduct: (url: string,body:{}):Promise<Proizvod> => axios.put(url,body).then(responseBody),
}

export const requestsWithHeaders = {
    get: (url: string,config:{}): Promise<any> => axios.get(url,config).then(responseBody),
    post:(url:string,body:{},config:{}):Promise<any>=>axios.post(url,body,config).then(responseBody),
    delete:(url:string,config:{}):Promise<any>=>axios.delete(url,config).then(responseBody),
    postItem:(url:string,body:{},config:{}):Promise<any>=>axios.post(url,body,config).then(responseBody),
    put: (url:string,body:{}, config:{})=> axios.put(url,body,config).then(responseBody)
  }

const Catalog = {
    list: () => requests.get('proizvodi'),
    details: (id:number) => requests.get(`proizvodi/proizvodiZaFront/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('proizvodi/28')
}

const Basket = {
    getKorpaFromCurrentUser: (headers = {}):Promise<any>=>{
        const config = {headers:{...defaultHeaders,...headers}};
        return requestsWithHeaders.get('korpe/stavke',config);
    },

    /*
    addItemToCurrentUser:(values:any,headers={}):Promise<any>=>{
        const config = {headers:{...defaultHeaders,...headers}};
        return requestsWithHeaders.post('stavkeKorpe/stavkaKorpa',{values},config)
    }*/

    addItemToCurrentUser:(proizvodId:any, headers={}):Promise<any>=>{
        const config = { headers: {...defaultHeaders,...headers }};
        return requestsWithHeaders.post('stavkeKorpe/stavkaKorpa', {proizvodId},config)
        .then(response => response.data)
        .catch(error => {
          if (error.response && error.response.status === 500) {
            toast.error('Ne mozete da kupite proizvod ako niste ulogovani!');
          }
        });
    },
    removeItemFromCurrentUser: (proizvodId: any, headers = {}) => {
        const config = { headers: { ...defaultHeaders, ...headers } };
        return requestsWithHeaders.delete(`stavkeKorpe/ukloniProizvodIzKorpe/${proizvodId}`, config)
          .then(response => response.data)
          .catch(error => {
            if (error.response && error.response.status === 404) {
              toast.error('Proizvod ne postoji u korpi!');
            }
          });
    },
    updateKolicinaOrRemoveItem:(proizvodId:any,headers={})=>{
        const config = { headers: { ...defaultHeaders, ...headers } };
        return requestsWithHeaders.delete(`stavkeKorpe/azurirajKolicinu/${proizvodId}`,config)
          .then(response => response.data)
          .catch(error => {
            if (error.response && error.response.status === 404) {
              toast.error('Proizvod ne postoji u korpi!');
            }
          });
    },
    updateKolicina:(proizvodId:any,headers={})=>{
        const config = { headers: { ...defaultHeaders, ...headers } };
        return requestsWithHeaders.delete(`stavkeKorpe/azurirajKolicinu/${proizvodId}`,config)
          .then(response => response.data)
          .catch(error => {
            if (error.response && error.response.status === 404) {
              toast.error('Proizvod ne postoji u korpi!');
            }
          });
    },
    updateKolicinaForPlus:(proizvodId:any,headers={})=>{
        const config = { headers: { ...defaultHeaders, ...headers } };
        return requestsWithHeaders.postItem('stavkeKorpe/dodajNaPlus',{proizvodId},config)
          .then(response => response.data)
          .catch(error => {
            if (error.response && error.response.status === 404) {
              toast.error('Proizvod ne postoji u korpi!');
            }
          });
    },
    getKorpaById:(headers={})=>{
      const config = { headers: { ...defaultHeaders, ...headers } };
      return requestsWithHeaders.get('korpe/korpaTrenutnoUlogovanog',config)
    },
}

const Order ={
  createOrder: () => requests.postOrder('porudzbine/porudzbinaZaKorpu'),
  createDetaljiIsporuke: (values:any) => requests.post('detaljiIsporuke/detaljiPorudzbine',values),
  updatePorudzbina:(headers={})=>{
    const config = { headers: { ...defaultHeaders, ...headers } };
    return requestsWithHeaders.put('stavkeKorpe/porudzbinaNaStavkama',{},config)
  },
  getAllPorudzbinaFromCurrentUser:()=>requests.get('porudzbine/porudzbineKorpe')
}

const Type = {
  getAllVrsta: ()=> requests.get('vrste/vrsteId')
}

const Payments = {
  createPaymentIntent: () => requests.post('placanje',{})
}

const Package = {
  getAllPakovanja: ()=> requests.get('pakovanja/pakovanjaId')
}

function createFormData(item:any){
  let formData = new FormData();
  for (const key in item){
    formData.append(key, item[key])
  }
  return formData;
}

const Admin ={
  createProduct: (product:Proizvod) =>requests.post('proizvodi',product),
  updateProduct: (product: {
    proizvodId: number;
    naziv: string;
    cijena: number;
    valuta: string;
    velicina: string;
    zalihe: number;
    pakovanjeId: number;
    kategorijaId: number;
    vrstaId: number;
  }, headers={}) => {
    const { proizvodId, ...productData } = product;
    const config = { headers: { ...defaultHeaders, ...headers } };
    return requestsWithHeaders.put(`proizvodi`, productData,config)},
  deleteProduct:(id:number,headers={})=>{
      const config = { headers: { ...defaultHeaders, ...headers } };
      return requestsWithHeaders.delete(`proizvodi/${id}`,config)
    },
}

const Categories ={
  getAllKategorije: ()=>requests.get('kategorije/kategorijeId')
}

const Account = {
    //login: (values:any) => requests.post('Account/login',values),
    login: (values: { korisnickoIme: string; lozinka: string }) => {
        return requests.post('Account/login', {
          korisnickoIme: values.korisnickoIme,
          lozinka: values.lozinka
        }).then(response => response.data);
      },
    //login: (values:any) =>requests.post('Account/login',values),
    register: (values:any) => requests.post('Account/register',values),
    currentUser: ()=> requests.get('korisnici/trenutniKorisnik')
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account,
    Order,
    Type,
    Package,
    Categories,
    Admin,
    Payments
}

export default agent;
