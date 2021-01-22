import { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { DateRangePicker } from "react-dates";
import { Form ,Button} from "react-bootstrap";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

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

export default function ({room}) {
    const stripePromise = loadStripe('pk_test_51HyLHAIgk2MP1Xy8rUM9akRuTVbB77IE5DvMQpcbxbeAqjxenvZ74lyxbvepsNYVLvNDHQ46XoiZUKOycMQJTzeX00b9amrHhK');

    const [customerData, setCustomerData] = useState({
        customer_name: "",
        customer_email: "",
    });

    const [dates, setDates] = useState({
        startDate: null,
        endDate: null,
    });

    const [focusedInput, setFocusedInput] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        const { data } = await axios.post("/api/payment", { reservation :{
            customer_name:customerData.customer_name,
            customer_email:customerData.customer_email,
            room_name:room.name,
            room_price:room.price,
            dates,
        }});
        console.log(data);
        const { paymentIntent } = data;

        try {
            const res = await stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });
            console.log(res);
            alert("payment was successful");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form
            onSubmit={handleSubmit}
        >
            <Form.Group controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    value={customerData.name} type="text"
                    onChange={(e) => setCustomerData({
                        customer_name: e.currentTarget.value,
                        customer_email: customerData.email,
                    })}
                    placeholder="Enter Name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    value={customerData.email}
                    onChange={(e) => setCustomerData({
                        customer_name: customerData.name,
                        customer_email:e.currentTarget.value,
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
            </Form.Group>
            <Form.Group controlId="formBasicCreditCard">
                <CardElement options={CARD_OPTIONS} />
            </Form.Group>
            <Button style={
                {
                    backgroundColor: '#273746',
                    fontSize:"22px",
                    marginTop:'2rem'
                }
            } type="submit" disabled={!stripe}>
                Confirm
      </Button>
        </Form>
    );
};
