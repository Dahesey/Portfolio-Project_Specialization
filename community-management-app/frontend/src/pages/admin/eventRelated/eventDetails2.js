import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const EventDetails = () => {
    const navigate = useNavigate();

    // State for storing events data
    const [events, setEvents] = useState([
        { id: 'CCI-001', name: 'Church Service', date: '2024-12-25', countdown: '' },
        { id: 'CCI-002', name: 'Youth Conference', date: '2025-01-15', countdown: '' }
    ]);

    // State for editing a specific event
    const [editingEventId, setEditingEventId] = useState(null);
    const [editedEvent, setEditedEvent] = useState({ name: '', date: '' });

    // Calculate countdown for events
    useEffect(() => {
        const updatedEvents = events.map(event => {
            const eventDate = dayjs(event.date);
            const today = dayjs();
            const countdown = eventDate.diff(today, 'day');
            return { ...event, countdown: `${countdown} days left` };
        });
        setEvents(updatedEvents);
    }, [events]); // Include `events` safely in the dependency array

    // Function to handle edit click
    const handleEditClick = (event) => {
        setEditingEventId(event.id);
        setEditedEvent({ name: event.name, date: event.date });
    };

    // Function to handle save
    const handleSaveClick = (eventId) => {
        const updatedEvents = events.map(event =>
            event.id === eventId ? { ...event, name: editedEvent.name, date: editedEvent.date } : event
        );
        setEvents(updatedEvents);
        setEditingEventId(null);
    };

    // Function to handle cancel
    const handleCancelClick = () => {
        setEditingEventId(null);
    };

    // Function to handle back navigation
    const handleBackClick = () => {
        navigate(-1); // Navigates to the previous page
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Manage Events</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Event ID</TableCell>
                            <TableCell>Event Name</TableCell>
                            <TableCell>Event Date</TableCell>
                            <TableCell>Countdown</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map(event => (
                            <TableRow key={event.id}>
                                <TableCell>{event.id}</TableCell>
                                <TableCell>
                                    {editingEventId === event.id ? (
                                        <TextField
                                            variant="outlined"
                                            value={editedEvent.name}
                                            onChange={(e) => setEditedEvent({ ...editedEvent, name: e.target.value })}
                                        />
                                    ) : (
                                        event.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingEventId === event.id ? (
                                        <TextField
                                            variant="outlined"
                                            type="date"
                                            value={editedEvent.date}
                                            onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
                                        />
                                    ) : (
                                        event.date
                                    )}
                                </TableCell>
                                <TableCell>{event.countdown}</TableCell>
                                <TableCell>
                                    {editingEventId === event.id ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleSaveClick(event.id)}
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
                                            onClick={() => handleEditClick(event)}
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

export default EventDetails;
