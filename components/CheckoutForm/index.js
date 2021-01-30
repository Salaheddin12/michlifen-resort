import { useState } from 'react'
import axios from "axios";
import { DateRangePicker } from "react-dates";
import { Form, Button } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from 'react-toastify';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import 'react-toastify/dist/ReactToastify.css';


const Joi = require('joi-browser');

const reactDates = require("react-dates/initialize");

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#273746",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#273746" },
            "::placeholder": { color: "#273746" },
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee",
        },
    },
};

export default function ({ room }) {
    const stripePromise = loadStripe('pk_test_51HyLHAIgk2MP1Xy8rUM9akRuTVbB77IE5DvMQpcbxbeAqjxenvZ74lyxbvepsNYVLvNDHQ46XoiZUKOycMQJTzeX00b9amrHhK');
    const stripe = useStripe();
    const elements = useElements();

    //border style
    const border = { border: '1px solid red' };
    const schema = Joi.object({
        name: Joi.string()
            .regex(/[a-zA-Z]/)
            .min(3)
            .max(30)
            .required()
            .label('Name'),
        email: Joi.string()
            .email()
            .required(),
        startDate: Joi.object().required(),
        endDate: Joi.object().required(),
    });

    const [errors, setErrors] = useState({});

    const [customerData, setCustomerData] = useState({
        customer_name: "",
        customer_email: "",
    });

    const [dates, setDates] = useState({
        startDate: null,
        endDate: null,
    });

    const [focusedInput, setFocusedInput] = useState(null);

    const validate = () => {

        console.log(customerData, dates);

        const values = {
            name: customerData.customer_name,
            email: customerData.customer_email,
            startDate: dates.startDate,
            endDate: dates.endDate
        }
        // Block native form submission.
        console.log(dates);
        const options = { abortEarly: false, presence: "required" };
        const { error } = Joi.validate(values, schema, options);
        if (!error) return null;
        const errors = {};
        error.details.map(error_ => errors[error_.path[0]] = error_.message);
        console.log(errors);
        return errors;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        const errors_ = validate();

        if (errors_) {
            setErrors(errors_);
            return;
        }

        const { data } = await axios.post("/api/payment", {
            reservation: {
                customer_name: customerData.customer_name,
                customer_email: customerData.customer_email,
                room_name: room.name,
                room_price: room.price,
                dates,
            }
        });
        const {paymentIntent} = data; 
        
                const response = await stripe.confirmCardPayment(paymentIntent.client_secret, {
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                })
                if(response.error){
                    toast.error(response.error.message);
                }
                else{
                    setCustomerData({ customer_name: '', customer_email: '' })
                    setDates({
                    startDate: null,
                    endDate: null,
                    })
                    setErrors({});
                    toast.info('payment was successful');
                }

                console.log(response)
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Form
                onSubmit={handleSubmit}
            >
                <Form.Group controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        style={errors.name && border}
                        value={customerData.customer_name} type="text"
                        onChange={(e) => setCustomerData({
                            customer_name: e.currentTarget.value,
                            customer_email: customerData.customer_email,
                        })}
                        placeholder="Enter Name" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        style={errors.email && border}
                        value={customerData.customer_email}
                        onChange={(e) => setCustomerData({
                            customer_name: customerData.customer_name,
                            customer_email: e.currentTarget.value,
                        })}
                        type="email"
                        placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                <Form.Group className='mb-4'>
                    <DateRangePicker
                        startDateId="startDate"
                        endDateId="endDate"
                        startDate={dates.startDate}
                        endDate={dates.endDate}
                        numberOfMonths={1}
                        startDatePlaceholderText="Check-in"
                        endDatePlaceholderText="Checkout"
                        onDatesChange={({ startDate, endDate }) => {
                            setDates({ startDate, endDate });
                        }}
                        focusedInput={focusedInput}
                        onFocusChange={(focusedInput) => {
                            setFocusedInput(focusedInput);
                        }}
                    />
                    {
                        (errors.startDate || errors.endDate) && <div className="mt-2" style={{ color: 'red' }}>Please select a valid Date</div>
                    }
                </Form.Group>
                <Form.Group controlId="formBasicCreditCard">
                    <CardElement options={CARD_OPTIONS} />
                    {
                        (errors.card) && <div className="mt-2" style={{ color: 'red' }}>Please inter valid card Info</div>
                    }
                </Form.Group>
                <Button style={
                    {
                        backgroundColor: '#f26e11',
                        fontSize: "22px",
                        marginTop: '2rem',
                        border: 'none'
                    }
                } type="submit" disabled={!stripe}>
                    Confirm
      </Button>
            </Form>
        </>
    );
};
