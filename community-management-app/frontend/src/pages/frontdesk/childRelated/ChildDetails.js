import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchChildrenList } from '../../../redux/childRelated/childHandle'; // Update with your Redux action

const ChildDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [children, setChildren] = useState([]);
    const [editingChildId, setEditingChildId] = useState(null);
    const [editedChild, setEditedChild] = useState({
        firstname: '', lastname: '', dob: '', gender: '', allergies: '',
        specialNeeds: '', ageCategory: '', fathersName: '', mothersName: '', guardianName: ''
    });

    // Fetch children when the component mounts
    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const resultAction = await dispatch(fetchChildrenList());
                const childrenData = resultAction.payload?.children;
                console.log("CHILDREN >>>>>>", resultAction)

                if (Array.isArray(childrenData)) {
                    setChildren(childrenData);
                } else {
                    console.error("Failed to fetch children:", resultAction.payload?.error || "Unknown error");
                }
            } catch (error) {
                console.error("Error fetching children:", error?.message || "Unknown error");
            }
        };

        fetchChildren();
    }, [dispatch]);

    const handleEditClick = (child) => {
        setEditingChildId(child._id);
        setEditedChild({ ...child });
    };

    const handleSaveClick = async (childId) => {
        try {
            await axios.put(`/api/children/${childId}`, editedChild);
            const updatedChildren = children.map(child =>
                child._id === childId ? { ...child, ...editedChild } : child
            );
            setChildren(updatedChildren);
            setEditingChildId(null);
        } catch (error) {
            console.error('Error saving child:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingChildId(null);
    };

    const handleBackClick = () => {
        navigate(-1); // Navigates to the previous page
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Manage Children</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Allergies</TableCell>
                            <TableCell>Special Needs</TableCell>
                            <TableCell>Age Category</TableCell>
                            <TableCell>Father's Name</TableCell>
                            <TableCell>Mother's Name</TableCell>
                            <TableCell>Guardian's Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children.map(child => (
                            <TableRow key={child._id}>
                                <TableCell>
                                    {editingChildId === child._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedChild.firstname}
                                            onChange={(e) => setEditedChild({ ...editedChild, firstname: e.target.value })}
                                        />
                                    ) : (
                                        child.firstname
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingChildId === child._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedChild.lastname}
                                            onChange={(e) => setEditedChild({ ...editedChild, lastname: e.target.value })}
                                        />
                                    ) : (
                                        child.lastname
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingChildId === child._id ? (
                                        <TextField
                                            variant="outlined"
                                            type="date"
                                            value={dayjs(editedChild.dob).format('YYYY-MM-DD')}
                                            onChange={(e) => setEditedChild({ ...editedChild, dob: e.target.value })}
                                        />
                                    ) : (
                                        dayjs(child.dob).format('DD/MM/YYYY')
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingChildId === child._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedChild.gender}
                                            onChange={(e) => setEditedChild({ ...editedChild, gender: e.target.value })}
                                        />
                                    ) : (
                                        child.gender
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingChildId === child._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedChild.allergies}
                                            onChange={(e) => setEditedChild({ ...editedChild, allergies: e.target.value })}
                                        />
                                    ) : (
                                        child.allergies
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingChildId === child._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedChild.specialNeeds}
                                            onChange={(e) => setEditedChild({ ...editedChild, specialNeeds: e.target.value })}
                                        />
                                    ) : (
                                        child.specialNeeds
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingChildId === child._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedChild.ageCategory}
                                            onChange={(e) => setEditedChild({ ...editedChild, ageCategory: e.target.value })}
                                        />
                                    ) : (
                                        child.ageCategory
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingChildId === child._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedChild.fathersName}
                                            onChange={(e) => setEditedChild({ ...editedChild, fathersName: e.target.value })}
                                        />
                                    ) : (
                                        child.fathersName
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingChildId === child._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedChild.mothersName}
                                            onChange={(e) => setEditedChild({ ...editedChild, mothersName: e.target.value })}
                                        />
                                    ) : (
                                        child.mothersName
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingChildId === child._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedChild.guardianName}
                                            onChange={(e) => setEditedChild({ ...editedChild, guardianName: e.target.value })}
                                        />
                                    ) : (
                                        child.guardianName
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingChildId === child._id ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleSaveClick(child._id)}
                                                sx={{ marginRight: '8px' }}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleCancelClick}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={() => handleEditClick(child)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ marginTop: '20px' }}>
                <Button variant="contained" onClick={handleBackClick}>
                    Back
                </Button>
            </Box>
        </Box>
    );
};

export default ChildDetails;
