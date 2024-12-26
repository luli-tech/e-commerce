import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
function onToken(token) {
    console.dir(token)
}
const Checkout = () => {
    return (
        <div>
            <StripeCheckout
                token={onToken}
                amount={200}
                currency='NGN'
                name='Vera'
                stripeKey="pk_test_51QT6InDFDXEbOPO35RWv9SY8YW9XrFy9Uv4IiUtcHN3Pcu58m25iV4kRAmgFukMoFsLlFrADzsdmbneV9tNyryOG006RSQfnxl"
            />
        </div>
    );
};

export default Checkout; 