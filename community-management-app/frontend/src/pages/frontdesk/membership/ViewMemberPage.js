import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchMembersList } from '../../../redux/memberRelated/memberHandle'; // Update with your Redux action

const MemberDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [members, setMembers] = useState([]);
    const [editingMemberId, setEditingMemberId] = useState(null);
    const [editedMember, setEditedMember] = useState({
        name: '', title: '', mobile: '', email: '', dob: '', address: '',
        state: '', gender: '', department: '', occupation: '', status: '',
        contributionToWelfare: '', memberSince: '', numberOfChildren: '',
        tithePayer: '', branch: ''
    });

    // Fetch members when the component mounts
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const resultAction = await dispatch(fetchMembersList());
                const membersData = resultAction.payload?.members;
                console.log("MEMBERS  >>>>>>>", resultAction)

                if (Array.isArray(membersData)) {
                    setMembers(membersData);
                } else {
                    console.error("Failed to fetch members:", resultAction.payload?.error || "Unknown error");
                }
            } catch (error) {
                console.error("Error fetching members:", error?.message || "Unknown error");
            }
        };

        fetchMembers();
    }, [dispatch]);

    const handleEditClick = (member) => {
        setEditingMemberId(member._id);
        setEditedMember({ ...member });
    };

    const handleSaveClick = async (memberId) => {
        try {
            await axios.put(`/api/members/${memberId}`, editedMember);
            const updatedMembers = members.map(member =>
                member._id === memberId ? { ...member, ...editedMember } : member
            );
            setMembers(updatedMembers);
            setEditingMemberId(null);
        } catch (error) {
            console.error('Error saving member:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingMemberId(null);
    };

    const handleBackClick = () => {
        navigate(-1); // Navigates to the previous page
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Manage Members</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map(member => (
                            <TableRow key={member._id}>
                                <TableCell>
                                    {editingMemberId === member._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedMember.name}
                                            onChange={(e) => setEditedMember({ ...editedMember, name: e.target.value })}
                                        />
                                    ) : (
                                        member.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingMemberId === member._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedMember.title}
                                            onChange={(e) => setEditedMember({ ...editedMember, title: e.target.value })}
                                        />
                                    ) : (
                                        member.title
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingMemberId === member._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedMember.mobile}
                                            onChange={(e) => setEditedMember({ ...editedMember, mobile: e.target.value })}
                                        />
                                    ) : (
                                        member.mobile
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingMemberId === member._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedMember.email}
                                            onChange={(e) => setEditedMember({ ...editedMember, email: e.target.value })}
                                        />
                                    ) : (
                                        member.email
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingMemberId === member._id ? (
                                        <TextField
                                            variant="outlined"
                                            type="date"
                                            value={dayjs(editedMember.dob).format('YYYY-MM-DD')}
                                            onChange={(e) => setEditedMember({ ...editedMember, dob: e.target.value })}
                                        />
                                    ) : (
                                        dayjs(member.dob).format('DD/MM/YYYY')
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingMemberId === member._id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedMember.address}
                                            onChange={(e) => setEditedMember({ ...editedMember, address: e.target.value })}
                                        />
                                    ) : (
                                        member.address
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingMemberId === member._id ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleSaveClick(member._id)}
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
                                            onClick={() => handleEditClick(member)}
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

export default MemberDetails;
