import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import EmployeeManagement from './Pages/EmployeeManagement';

export default function App() {
    useEffect(() => {
        const link = document.querySelector("link[rel~='icon']");
        if (!link) {
            const newLink = document.createElement("link");
            newLink.rel = "icon";
            newLink.href = "/squirrel.svg"; // Path to your SVG file in the public folder
            document.head.appendChild(newLink);
        } else {
            link.href = "/squirrel.svg";
        }
    }, []);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/employeemanagement" element={<EmployeeManagement />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
