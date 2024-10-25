import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Box, IconButton, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';

// Dummy Data
// const userProfile = {
//     name: "John Doe",
//     title: "Mr.",
//     mobile: "+1 234 567 890",
//     email: "john.doe@example.com",
//     dob: "1990-01-15",
//     address: "123 Main Street, Springfield",
//     state: "Existing Member",
//     gender: "Male",
//     department: "Music",
//     occupation: "Engineer"
// };

const AdminProfile = () => {

    const { currentUser } = useSelector((state) => state.user);


    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(currentUser);

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Implement save functionality (e.g., API call) here
        console.log('Profile saved:', profileData);
        setIsEditing(false);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Card sx={{ maxWidth: 600, padding: '20px', borderRadius: '15px', boxShadow: 3 }}>
                <CardContent>
                    {/* Profile Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <Avatar
                            alt={profileData.name}
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 80, height: 80, marginRight: '20px' }}
                        />
                        <div>
                            <Typography variant="subtitle1" color="text.secondary">
                                {profileData.title}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {profileData.name}
                            </Typography>
                            <IconButton onClick={handleEditToggle}>
                                <EditIcon />
                            </IconButton>
                        </div>
                    </Box>

                    {/* Profile Information */}

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Title"
                                name="title"
                                value={profileData.title}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>


                   
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Mobile"
                                name="mobile"
                                value={profileData.mobile}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Email"
                                name="email"
                                value={profileData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Date of Birth"
                                name="dob"
                                value={profileData.dob}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Address"
                                name="address"
                                value={profileData.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" disabled={!isEditing}>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    name="gender"
                                    value={profileData.gender}
                                    onChange={handleChange}
                                    label="Gender"
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Department"
                                name="department"
                                value={profileData.department}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Occupation"
                                name="occupation"
                                value={profileData.occupation}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                    </Grid>

                    {/* Save Button */}
                    {isEditing && (
                        <Box sx={{ marginTop: '20px' }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleSave}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default AdminProfile;
