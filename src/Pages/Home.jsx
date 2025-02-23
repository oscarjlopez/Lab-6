import React from 'react';
import { TitleProvider } from '../context/TitleContext'; // Import the TitleProvider
import ResponsiveAppBar from '../components/Header'; // Import Header component
import Main from '../components/Main'; // Import Main content component
import Footer from '../components/Footer'; // Import Footer component

const Home = () => (
    <TitleProvider> {/* Wrap everything with the TitleProvider */}
        <ResponsiveAppBar /> {/* Header that displays the dynamic title */}
        <Main /> {/* Main content goes here */}
        <Footer /> {/* Footer with input to update title */}
    </TitleProvider>
);

export default Home;
