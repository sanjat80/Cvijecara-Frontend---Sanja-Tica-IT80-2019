import { useEffect, useState } from "react";
import { StavkeKorpe } from "../../app/models/korpa";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Button, Divider, IconButton,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import {Link} from "react-router-dom";
import { Add, Delete, Remove } from "@mui/icons-material";
import { toast } from "react-toastify";

export default function BasketPage(){
    //const {id} = useParams<{id: string | undefined}>();
    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState<StavkeKorpe []>([]);
    //const history = useHistory()

    const handleDeleteItem = (productId: number) => {
      try {
          agent.Basket.removeItemFromCurrentUser(productId)
          setBasket(basket.filter(item => item.proizvodId !== productId));
      } catch (error) {
          console.log(error);
          console.log(productId)
      }
  };

  /*const handleUpdateBasket= (productId: number) => {
    agent.Basket.updateKolicina(productId)
    .then(response => {
      if(response.kolicina>1){
      const updatedBasket = basket.map(item =>
        item.proizvodId === response.proizvodId
        ? {...item, kolicina:response.kolicina}
        :item
    );
    setBasket([...updatedBasket]);
  } else {
    setBasket([...basket.filter(item => item.proizvodId !== productId)]);
  }
})
.catch(error => {
  console.log(error)
})
}*/
const handleUpdateBasket= (productId: number) => {
  const updatedBasket = basket.map(item =>
    item.proizvodId === productId
      ? {...item, kolicina: item.kolicina - 1}
      : item
  );
  setBasket(updatedBasket);

  const itemToUpdate: StavkeKorpe | undefined = updatedBasket.find(item => item.proizvodId === productId);

  if (itemToUpdate && itemToUpdate.kolicina > 0) {
    agent.Basket.updateKolicina(productId)
      .then(response => {
        if (response.kolicina > 1) {
          const updatedBasket = basket.map(item =>
            item.proizvodId === response.proizvodId
              ? {...item, kolicina: response.kolicina}
              : item
          );
          setBasket([...updatedBasket]);
        } else {
          setBasket([...basket.filter(item => item.proizvodId !== productId)]);
        }
      })
      .catch(error => {
        console.log(error)
      });
  } else {
    setBasket(basket.filter(item => item.proizvodId !== productId));
  }
}

const addItemToCart = (proizvodId: any) => {
  const updatedBasket = basket.map(item =>
    item.proizvodId === proizvodId
      ? {...item, kolicina: item.kolicina + 1}
      : item
  );
  setBasket(updatedBasket);

  const itemToUpdate: StavkeKorpe | undefined = updatedBasket.find(item => item.proizvodId === proizvodId);

  if (itemToUpdate && itemToUpdate.kolicina > 0) {
    agent.Basket.updateKolicinaForPlus(proizvodId)
      .then(response => {
          const updatedBasket = basket.map(item =>
            item.proizvodId === response.proizvodId
              ? {...item, kolicina: response.kolicina}
              : item
          );
          setBasket([...updatedBasket]);
        })
        .catch(error => {
          console.log(error)
        })
      }
}

  const isUserLoggedIn = localStorage.getItem('user');
  

  const totalPrice = basket.reduce((acc, item) => {
    const itemTotalPrice = item.cijena;
    return acc + itemTotalPrice;
  }, 0);
  /*const handleUpdateItem = (productId: number) => {
    agent.Basket.updateKolicinaOrRemoveItem(productId)
      .then(response => {
        if (response.kolicina > 1) {
          const updatedBasket = basket.map(item =>
            item.proizvodId === response.proizvodId
              ? { ...item, kolicina: response.kolicina }
              : item
          );
          setBasket(updatedBasket);
        } else {
          // Remove the item from the basket
          setBasket(basket.filter(item => item.proizvodId !== productId));
        }
      })
      .catch(error => {
        console.log(error);
        console.log(productId);
      });
  };*/


  /*const handleUpdateItem = (proizvodId:any) => {
    const item = basket.find((item) => item.proizvodId === proizvodId);
  
    if (item && item.kolicina > 1) {
      const response = agent.Basket.updateKolicina(proizvodId);
      const updatedBasket = basket.map((item) =>
        item.proizvodId === response.proizvodId
          ? { ...item, kolicina: response.kolicina }
          : item
      );
      setBasket(updatedBasket);
    }
  };*/
  
  
  
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: 'Purple',
          color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    
    useEffect(()=>{
        agent.Basket.getKorpaFromCurrentUser()
        .then((basket:any) => {
        setBasket(basket);
        localStorage.setItem('basket', JSON.stringify(basket));
        agent.Basket.getKorpaById().then((basketById:any)=>{
          const korpa = JSON.stringify(basketById)
          localStorage.setItem('basketById',korpa);
        })
        .catch(error=> console.log(error))
    })
        .catch((error:any) => console.log(error))
        .finally(()=> setLoading(false))
    },[])

    if(loading) return <LoadingComponent message="Loading basket..."></LoadingComponent>
    if(!basket) return <Typography variant = 'h3'>Vaša korpa je prazna</Typography>
    return (
        <>
        {!isUserLoggedIn &&
        ( 
          <>
          <Typography variant="h3" style={{textAlign:'center',fontFamily:'Old Standard TT',fontWeight:'bold',color:'black'}}>Samo ulogovani korisnici mogu da vide sadržaj svoje korpe...</Typography>
          <Divider></Divider>
          <img src="/images/flying.png" alt="not-found" style={{marginLeft:'300px',marginTop:'70px'}}></img>
          </>
          )}
        {isUserLoggedIn && (
          <>
            <h1 style={{textAlign:'center',color:'purple',fontFamily:'Old Standard TT'}}>SADRŽAJ VAŠE KORPE: </h1>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
          <TableRow>
            <StyledTableCell style={{height:'25px', fontWeight:"bold", fontFamily:'Old Standard TT'}}>NAZIV PROIZVODA</StyledTableCell>
            <StyledTableCell align="center" style={{width:'25px',fontWeight:'bold', fontFamily:'Old Standard TT'}}>KOLICINA</StyledTableCell>
            <StyledTableCell align="right" style={{fontWeight:"bold",fontFamily:'Old Standard TT'}}>CIJENA</StyledTableCell>
            <StyledTableCell align="right" style={{fontWeight:"bold",fontFamily:'Old Standard TT'}}>UKLONI</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
           {basket.map((item, index)=>(
            <>
            <StyledTableRow key={index}>
            <StyledTableCell component="th" scope="row" style={{fontWeight:"bold", fontFamily:'Old Standard TT'}}>
              {item.naziv}
            </StyledTableCell>
            <StyledTableCell align="right" style={{fontWeight:"bold",fontFamily:'Old Standard TT'}}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton color='error' style={{marginRight:'4px'}} onClick={()=> handleUpdateBasket(item.proizvodId)}>
                <Remove/>
              </IconButton>
                  <h3>{item.kolicina}</h3>
              <IconButton color='success' style={{marginLeft:'4px'}} onClick={()=>addItemToCart(item.proizvodId)}>
                <Add/>
              </IconButton>
              </div>
            </StyledTableCell>
            <StyledTableCell align="right" style={{fontWeight:"bold",fontFamily:'Old Standard TT'}}>{item.cijena}</StyledTableCell>
            <StyledTableCell align="right">
              <IconButton color='error' onClick={() => handleDeleteItem(item.proizvodId)}>
                <Delete/>
              </IconButton>
            </StyledTableCell>
          </StyledTableRow>
            </>
           ))}
           </TableBody>
        </Table>
        </TableContainer>
        <div>
          <h3 style={{fontWeight:"bold",fontFamily:'Old Standard TT',display: 'inline-block'}}>UKUPN IZNOS VAŠE KORPE: </h3>
          <h3 style={{fontWeight:"bold",fontFamily:'Old Standard TT',display: 'inline-block',marginLeft:'535px'}}> {totalPrice} RSD</h3>
        </div>
        <Button component={Link} to='/checkout' style={{
        marginTop: '50px',
        marginLeft: '530px',
        color: 'white',
        border: '1px solid purple',
        backgroundColor: 'purple',
        marginBottom:'50px',
        fontFamily:'Old Standard TT',
        fontWeight:"bold"
      }}
      >
          PORUČI
        </Button>
        <Divider></Divider>
        <div style={{display: "flex"}}>
            <img src="/images/iris.png" alt='iris' style={{height:"200px",width:"200px", marginRight:"50px",marginTop:"35px"}}/>
            <img src="/images/lavender.png" alt='lavender' style={{height:"200px",width:"200px",marginLeft:"210px",marginTop:"35px"}}/>
            <img src="/images/flower.png" alt='flower' style={{height:"200px",width:"200px",marginLeft:"290px",marginTop:"35px"}}/>
        </div>
          </>
        )}
        
    </>
    )
}