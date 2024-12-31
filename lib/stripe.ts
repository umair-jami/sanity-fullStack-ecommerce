import Stripe from "stripe";

if(!process.env.STRIPE_SECRET_KEY){
    throw new Error("Stripe secret key is not set")
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion:"2024-12-18.acacia",
    typescript:true,
})
export default stripe;
