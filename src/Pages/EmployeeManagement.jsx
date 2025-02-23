import React from 'react';
import { TitleProvider } from '../context/TitleContext'; // Import the TitleProvider
import ResponsiveAppBar from '../components/Header'; // Import Header component
import Footer from '../components/Footer'; // Import Footer component
import EmployeeManagementTable from '../components/EmployeeManagementTable'

const EmployeeManagement = () => (
    <TitleProvider> {/* Wrap everything with the TitleProvider */}
        <ResponsiveAppBar /> {/* Header that displays the dynamic title */}
        <EmployeeManagementTable />
        <Footer /> {/* Footer with input to update title */}
    </TitleProvider>
);

export default EmployeeManagement;
