import React from 'react';
import Slider from './slider';
import Products from './products';
import { ScrollRestoration } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Slider />
            <Products />
        </div>
    );
};

export default Home;