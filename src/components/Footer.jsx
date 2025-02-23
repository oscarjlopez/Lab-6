import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTitle } from '../context/TitleContext'; // Import the context

const Footer = () => {
    const { setTitle } = useTitle(); // Get function to update the title
    const [name, setName] = React.useState('');

    const handleSubmit = () => {
        if (name.trim() !== '') {
            setTitle(`Welcome ${name} to Codecraft Intranet`);
        }
    };

    return (
        <footer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                {/* Left section for TextField and Button */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        id="filled-basic"
                        label="Enter Name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mr: 2 }} // Add margin-right for spacing
                    />
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>

                {/* Centered copyright text */}
                <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <p>&copy; {new Date().getFullYear()} CodeCraft Labs. All rights reserved.</p>
                </Box>
            </Box>
        </footer>
    );
};

export default Footer;
