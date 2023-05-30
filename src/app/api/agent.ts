import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../router/Routes";
import { store } from "../store/configureStore";
import { url } from "inspector";
import { CreateProizvod, ProductParams, Proizvod } from "../models/proizvod";
import { KorisnikAdminCreate, KorisnikAdminUpdate, KorisnikRegistration } from "../models/user";
import { PakovanjeCreation, PakovanjeUpdate } from "../models/pakovanje";
import { KategorijaCreate, KategorijaUpdate } from "../models/kategorija";
import { VrstaCreate, VrstaUpdate } from "../models/vrsta";

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
            router.navigate('/server-error', {state: {error: data.title}});
            break;
        default:
            break;
        }       
    }
    return Promise.reject(error);
})

export const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    getFilters:(url: string, params?:any) => axios.get(url,{params}).then(responseBody),
    post: (url: string, body:{}) => axios.post(url, body).then(responseBody),
    put: (url: string, body:{}) => axios.put(url,body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postOrder: (url:string) => axios.post(url).then(responseBody),
    putProduct: (url: string,body:{}):Promise<Proizvod> => axios.put(url,body).then(responseBody),
    getUser:(url:string, body:{})=>axios.get(url,body).then(responseBody)
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
    details: (id:number) => requests.get(`proizvodi/proizvodiZaFront/${id}`),
    /*listSearch: (orderBy?:string, searchTerm?:string, kategorija?:string, vrsta?:string)=>{
      const params={
        orderBy:orderBy,
        searchTerm:searchTerm,
        kategorija:kategorija,
        vrsta:vrsta
      }

      return requests.getFilters('proizvodi',{params})
    }*/
    listSearch: (
      orderBy?: string,
      searchTerm?: string,
      kategorija?: string,
      vrsta?: string,
      queryParams?: string
    ) => {
      const params = {
        orderBy: orderBy,
        searchTerm: searchTerm,
        kategorija: kategorija,
        vrsta: vrsta
      };
      const url = queryParams ? `proizvodi${queryParams}` : 'proizvodi';
      return requests.getFilters(url,{params});
    }
    
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
  getAllPorudzbinaFromCurrentUser:(headers={})=>{
    const config = { headers: { ...defaultHeaders, ...headers } };
    return requestsWithHeaders.get('porudzbine/porudzbineKorpe',config)
  }
}

const Type = {
  getAllVrsta: ()=> requests.get('vrste/vrsteId'),
  getAllVrste: ()=> requests.get('vrste'),
  createVrsta: (vrsta: VrstaCreate, headers={}) =>{
    const config = { headers: { ...defaultHeaders, ...headers }}
    return requestsWithHeaders.post('vrste',vrsta, config)
  },
  updateVrsta: (vrsta: VrstaUpdate, headers={}) => {
    //const { proizvodId, ...productData } = product;
    const config = { headers: { ...defaultHeaders, ...headers } };
    return requestsWithHeaders.put(`vrste`, vrsta,config)},
  deleteVrsta:(id:number,headers={})=>{
      const config = { headers: { ...defaultHeaders, ...headers } };
      return requestsWithHeaders.delete(`vrste/${id}`,config)
    },

}

const Payments = {
  createPaymentIntent: (headers={}) => {
    const config = { headers: { ...defaultHeaders, ...headers }}
    return requestsWithHeaders.post('placanje',{}, config)
  }
}

const Package = {
  getAllPakovanja: ()=> requests.get('pakovanja/pakovanjaId'),
  getPakovanje:()=>requests.get('pakovanja'),
  createPakovanje: (pakovanje: PakovanjeCreation, headers={}) =>{
    const config = { headers: { ...defaultHeaders, ...headers }}
    return requestsWithHeaders.post('pakovanja',pakovanje, config)
  },
  updatePakovanje: (pakovanje:PakovanjeUpdate, headers={}) => {
    //const { proizvodId, ...productData } = product;
    const config = { headers: { ...defaultHeaders, ...headers } };
    return requestsWithHeaders.put(`pakovanja`, pakovanje,config)},
  deletePakovanje:(id:number,headers={})=>{
      const config = { headers: { ...defaultHeaders, ...headers } };
      return requestsWithHeaders.delete(`pakovanja/${id}`,config)
    },


}

function createFormData(item:any){
  let formData = new FormData();
  for (const key in item){
    formData.append(key, item[key])
  }
  return formData;
}

const Filters ={
  filteri: ()=> requests.get('proizvodi/filteri')
}

const User = {
  getCurrentUser: (korisnickoIme:string)=>requests.get(`korisnici/profil/${korisnickoIme}`),
  getAllusers: () => requests.get('korisnici'),
  getAllType:()=> requests.get('tipoviKorisnika/tipoviKorisnikaId'),
  createUser: (user:KorisnikAdminCreate, headers={}) =>{
    const config = { headers: { ...defaultHeaders, ...headers }}
    return requestsWithHeaders.post('korisnici',user, config)
  },
  updateUser: (user:KorisnikAdminUpdate, headers={}) => {
    //const { proizvodId, ...productData } = product;
    const config = { headers: { ...defaultHeaders, ...headers } };
    return requestsWithHeaders.put(`korisnici/adminUpdate`, user,config)},
  deleteUser:(id:number,headers={})=>{
      const config = { headers: { ...defaultHeaders, ...headers } };
      return requestsWithHeaders.delete(`korisnici/${id}`,config)
    },
  updateRegistredUser: (user:KorisnikRegistration, headers={})=>{
    const config = { headers: { ...defaultHeaders, ...headers }}
    return requestsWithHeaders.put('korisnici/registrovani', user, config);
  }

}

const Admin ={
  createProduct: (product:CreateProizvod, headers={}) =>{
    const config = { headers: { ...defaultHeaders, ...headers }}
    return requestsWithHeaders.post('proizvodi',product, config)
  },
  updateProduct: (product: Proizvod, headers={}) => {
    //const { proizvodId, ...productData } = product;
    const config = { headers: { ...defaultHeaders, ...headers } };
    return requestsWithHeaders.put(`proizvodi`, product,config)},
  deleteProduct:(id:number,headers={})=>{
      const config = { headers: { ...defaultHeaders, ...headers } };
      return requestsWithHeaders.delete(`proizvodi/${id}`,config)
    },
}

const Categories ={
  getAllKategorije: ()=>requests.get('kategorije/kategorijeId'),
  getAllCategories: ()=>requests.get('kategorije'),
  createCategory: (category: KategorijaCreate, headers={}) =>{
    const config = { headers: { ...defaultHeaders, ...headers }}
    return requestsWithHeaders.post('kategorije',category, config)
  },
  updateCategory: (category:KategorijaUpdate, headers={}) => {
    //const { proizvodId, ...productData } = product;
    const config = { headers: { ...defaultHeaders, ...headers } };
    return requestsWithHeaders.put(`kategorije`, category,config)},
  deleteCategory:(id:number,headers={})=>{
      const config = { headers: { ...defaultHeaders, ...headers } };
      return requestsWithHeaders.delete(`kategorije/${id}`,config)
    },

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
    Payments,
    Filters,
    User
}

export default agent;
