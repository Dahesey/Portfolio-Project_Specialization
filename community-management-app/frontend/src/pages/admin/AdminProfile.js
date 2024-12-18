import React, { useState } from 'react'; 
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid, Avatar, Box, IconButton, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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
                            // src="/static/images/avatar/1.jpg"
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

                        {/* New Fields: Contact and Church Name */}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Contact"
                                name="contact"
                                value={profileData.contact}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Church Name"
                                name="churchName"
                                value={profileData.churchName}
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
