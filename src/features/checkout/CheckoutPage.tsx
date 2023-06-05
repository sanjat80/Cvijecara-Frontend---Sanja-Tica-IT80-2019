import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AdressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {  validationScheme } from './checkoutValidation';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import { StripeElementType } from '@stripe/stripe-js';
import { useAppSelector } from '../../app/store/configureStore';
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address','Review your order', 'Payment details'];


const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationScheme[activeStep];
  const [loading, setLoading]=useState(false);
  //const [porudzbinaId, setPorudzbinaId] = useState("");
  //const currentValidationSchema = validationScheme[];
  const [order,setOrder] = useState(null);
  const [cardState, setCardState] = useState<{elementError:{[key in StripeElementType]?:string}}>({elementError:{}})
  const [cardComplete, setCardComplete] = useState<any>({cardNumber:false, cardExpiry: false, cardCvc:false});
  const [paymentMessage, setPaymentMessage]=useState("");
  const [paymentSucceeded, setPaymentSucceeded]=useState(false);
  const basket = localStorage.getItem('basketById');
 ;
  const stripe = useStripe();
  const elements = useElements();
  function onCardInputChange(event:any){
    setCardState((prevState)=>({
      ...prevState,
      elementError:{
        ...prevState.elementError,
        [event.elementType]:event.error?.message
      },
    }));
    setCardComplete((prevState :any)=>({
      ...prevState, [event.elementType]:event.complete}));
  }
  const methods = useForm({
    mode:'all',
    resolver: yupResolver(currentValidationSchema)
  });

  useEffect(() => {
    agent.Order.createOrder()
      .then((order:any)=>setOrder(order))
      .catch((error:any)=>console.log(error))
  }, []);


  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review />;
      case 2:
        return <PaymentForm  cardState={cardState} onCardInputChange={onCardInputChange}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  async function submitOrder(data:FieldValues){
    console.log('unutar metode submitorder smo')
    setLoading(true);
    //const {...adresa} = data;
    if(!stripe || !elements) return;
    try{
      if(basket){
        const cardElement = elements.getElement(CardNumberElement);
        const basketJSON = JSON.parse(basket)
        const paymentResult = await stripe.confirmCardPayment(basketJSON?.clientSecret!,{
          payment_method: {
            card: cardElement!,
            billing_details: {
              name: 'John Doe',
            },
          },
        })
          console.log(paymentResult)
        
        if(paymentResult.paymentIntent?.status === 'succeeded'){
          //agent.Order.createOrder();
          agent.Basket.deleteAllFromKorpa();
          setTimeout(async () =>{
            agent.Basket.deleteKorpaFromCurrentUser();
          }, 1000)
          setPaymentSucceeded(true);
          setPaymentMessage('Vasa porudzbina je prihvacena, hvala!');
          setActiveStep(activeStep+1);
          setLoading(false);
        } else {
          setPaymentMessage(paymentResult.error?.message!);
          setPaymentSucceeded(false);
          setLoading(false);
          setActiveStep(activeStep+1);
        }
      }
    }catch(error){
      console.log(error);
      setLoading(false);
    }
  }
  const handleNext = async(data:FieldValues) => {
    setLoading(true)
    if(activeStep === 0)
    {
        agent.Order.createDetaljiIsporuke(data)
    }
    else if(activeStep === 1)
    {
       agent.Order.updatePorudzbina();
    }
    else if(activeStep === steps.length - 1)
    {
      console.log('pozvano');
     submitOrder(data);
    setTimeout(() => {
      setLoading(false);
      setActiveStep(activeStep + 1);
    }, 0);
    return;
  }
    setLoading(false)
    setActiveStep(activeStep + 1);
  };
 /*const handleNext =(data: FieldValues) => {
  methods.handleSubmit((data) => {
      setLoading(true);
      if (activeStep === 0) {
        agent.Order.createDetaljiIsporuke(data)
          .then(() => {
            setLoading(false);
            //setActiveStep(activeStep + 1);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } else if (activeStep === 1) {
        agent.Order.updatePorudzbina()
          .then(() => {
            setLoading(false);
            //setActiveStep(activeStep + 1);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }else if (activeStep === steps.length - 1) {
        submitOrder(data)
      }
      setActiveStep(activeStep+1)
    })();
  };*/
  

  function submitDisabled():boolean{
    if(activeStep === steps.length-1){
        return !cardComplete.cardCvc 
        || !cardComplete.cardExpiry 
        || !cardComplete.cardNumber
        || !methods.formState.isValid
      }else {
        return !methods.formState.isValid
      }
    }
  

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <FormProvider {...methods}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            BOTANIKO
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                {paymentMessage}
              </Typography>
              {paymentSucceeded ? (
                 <Typography variant="subtitle1">
                 Uspješno ste poručili željene proizvode! Poslaćemo Vam email kada porudžbina bude isporučena.
               </Typography>
              ):(
                <Button variant = 'contained' onClick={handleBack}> Vrati se nazad</Button>
              )}
            </React.Fragment>
          ) : (
            <form onSubmit={handleNext}>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
              </Button>
                )}
                 <Button style={{marginTop:'24px'}} onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </form>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
    </FormProvider>
  );
}