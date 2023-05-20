import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";


const stripePromise = loadStripe('pk_test_51N9DHSFihS298C4bDpaqzW7Sdw1HJOtYPhcg7ruXeNUpVxb43FHDBwziy4zXatCgdqRyEnJbdcH0pg8mkusCZqSF00rpAar5Ch');

export default function CheckoutWrapper(){
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [basket,setBasket] = useState(null);

    useEffect(()=>{
        agent.Payments.createPaymentIntent()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(()=>setLoading(false))
    },[])

    if (loading) return <LoadingComponent message="Ucitavanje checkout strane"/>

    return(
        <Elements stripe={stripePromise}>
            <CheckoutPage/>
        </Elements>
    )
}