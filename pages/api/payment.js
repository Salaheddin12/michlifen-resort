
export default async function handler(req, res) {
    const stripe = require("stripe")("sk_test_51HyLHAIgk2MP1Xy8qLHm3iAXBhQlXRBffGs3MJWjDoravdR52eusbQh3TDihnMpGYdQb7oSo8pJQOAC7HMpjghPH00Oo0Ysr2Y");
  
    // const cookie = await parseCookies({req});
    const { customer_name,customer_email,room_name,room_price,dates} = req.body.reservation;

    const {id} = await stripe.customers.create({
      name:customer_name,
      email:customer_email,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount:room_price * 100,
      currency: 'mad',
      customer:id,
      metadata:{
        room:room_name,
        startDate: dates.startDate,
        endDate: dates.endDate,
      },
      payment_method_types: ['card'],
    });
    
    res.status(200).json({paymentIntent});
  }