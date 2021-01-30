
export default async function handler(req, res) {
    const stripe = require("stripe")("sk_test_51HyLHAIgk2MP1Xy8qLHm3iAXBhQlXRBffGs3MJWjDoravdR52eusbQh3TDihnMpGYdQb7oSo8pJQOAC7HMpjghPH00Oo0Ysr2Y");
  
    const { customer_name,customer_email,room_name,room_price,dates} = req.body.reservation;
    
    try{
    const paymentIntent = await stripe.paymentIntents.create({
      amount:room_price * 100,
      currency: 'mad',
      metadata:{
        customer_name:customer_name,
        customer_email:customer_email,
        room:room_name,
        startDate: dates.startDate,
        endDate: dates.endDate,
      },
      payment_method_types: ['card'],
    });
    res.status(200).json({paymentIntent});
    }
  catch(error){
    res.status(400).json({error});
    }
  }
  