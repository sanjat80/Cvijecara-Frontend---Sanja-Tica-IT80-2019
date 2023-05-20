import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Proizvod, ProizvodDetalji } from "../../app/models/proizvod";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props{
    product: Proizvod;
    index: number;
}

export default function ProductsCard({product,index}:Props){
  //const user = localStorage.getItem('user');
    const imageFilenames =["bella epoque.jpg","cherry brandy.jpg","orhideja.jpg","crvene lale.jpg","praline.jpg","narcis.jpg","ljubicice.jpg","bijelerade.jpg","cokolada srce.jpg","zutelale.jpg"];
    const addItemToCart = (proizvodId: any) => {
      const user = localStorage.getItem('user');
      if(!user)
      {
        toast.error('Samo prijavljeni korisnici mogu kupiti proizvode!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      agent.Basket.addItemToCurrentUser(proizvodId)
      .then(()=>{
        toast.success('Proizvod je uspjesno dodat u korpu!',{
          position: toast.POSITION.TOP_RIGHT
        });
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    
    /*const addItemToCart = (proizvodId: any) => {
      agent.Basket.getKorpaFromCurrentUser()
        .then((basketItems) => {
          // Check if the product already exists in the basket
          const productInBasket = basketItems.find((item:any) => item.proizvodId === proizvodId);
    
          if (productInBasket) {
            toast.warning('Proizvod je već u korpi!', {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          } else {
            agent.Basket.addItemToCurrentUser(proizvodId)
              .then(() => {
                toast.success('Proizvod je dodat u korpu!', {
                  position: toast.POSITION.TOP_RIGHT
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };*/

    //const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    /*useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentImageIndex((index) => (index + 1) % imageFilenames.length);
        }, 5000);
        return () => clearInterval(intervalId);
      }, [imageFilenames]);
    */

    return(
        <Card>
            <CardHeader avatar={
                <Avatar sx={{backgroundColor:'secondary.main', color:'white'}}>
                    {product.naziv.charAt(0).toUpperCase()}
                </Avatar>
            }
            title = {product.naziv.toUpperCase()}
            titleTypographyProps={{
                sx: {fontWeight: 'bold', color:'secondary.main'}
            }}
            />
        <CardMedia
          sx={{ height: 140, backgroundSize: 'contain'}}
          image={`/images/${imageFilenames[index % imageFilenames.length]}`}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom color='secondary' variant="h5">
            {product.cijena} EUR
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.velicina}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"onClick={() => addItemToCart(product.proizvodId)} >Kupi</Button>
          <Button component={Link} to={`/catalog/${product.proizvodId}`} size="small" style={{color:'white',backgroundColor:'purple',marginBottom:'12px',alignContent:'center',marginLeft:'10px'}} >Detalji</Button>
        </CardActions>
      </Card>
    )
}