import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { TitleProvider } from "../context/TitleContext"; 
import ResponsiveAppBar from "../components/Header"; 
import Footer from "../components/Footer"; 
import EmployeeManagementTable from "../components/EmployeeManagementTable";

const EmployeeManagement = () => {
    const { state, signIn, signOut } = useAuthContext();

    return (
        <TitleProvider> 
            <ResponsiveAppBar /> 
            
            <div style={styles.container}>
                {state.isAuthenticated ? (
                    // Only show the EmployeeManagementTable if the user is authenticated
                    <EmployeeManagementTable />
                ) : (
                    <div style={styles.loginMessageContainer}>
                        <h2 style={styles.loginMessage}>You must be logged in to view this page.</h2>
                        <button onClick={() => signIn()} style={styles.loginButton}>
                            Login
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </TitleProvider>
    );
};

// Styling
const styles = {
    container: {
        textAlign: "center",
        margin: "40px 0",
        padding: "20px",
    },
    welcomeMessage: {
        fontSize: "24px",
        color: "#4CAF50",
        fontWeight: "bold",
    },
    logoutButton: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
    },
    loginMessageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "300px",
        backgroundColor: "#f1f1f1",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    loginMessage: {
        fontSize: "20px",
        color: "#ff5722",
        marginBottom: "20px",
    },
    loginButton: {
        padding: "12px 24px",
        fontSize: "16px",
        backgroundColor: "#cc5500",  // Burnt orange color
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
};

export default EmployeeManagement;
