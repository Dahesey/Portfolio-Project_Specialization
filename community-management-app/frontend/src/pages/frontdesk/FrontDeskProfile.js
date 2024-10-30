import React from 'react'; 
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const FrontdeskProfile = () => {
    // Get the current user details from the Redux store
    const { currentUser } = useSelector((state) => state.user);
    console.log("CURRENT USER >>>>>>", currentUser);

    // Extracting only name and role from currentUser
    const { frontdeskName, role } = currentUser || {}; // Destructure name and role, provide default empty object

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Card sx={{ maxWidth: 600, padding: '20px', borderRadius: '15px', boxShadow: 3 }}>
                <CardContent>
                    {/* Profile Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <Avatar
                            alt={frontdeskName}
                            // Optionally set an avatar image source here if available
                            sx={{ width: 80, height: 80, marginRight: '20px' }}
                        />
                        <div>
                            <Typography variant="h5" component="div">
                                {frontdeskName}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {`${role} Personnel`} {/* Use template literals to avoid warning */}
                            </Typography>
                        </div>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default FrontdeskProfile;
