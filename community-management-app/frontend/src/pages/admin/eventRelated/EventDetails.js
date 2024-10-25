import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchEventsList } from "../../../redux/eventRelated/eventHandle";

const EventDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [events, setEvents] = useState([]); // Initialize as an empty array

    // Fetch events when the component mounts
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const resultAction = await dispatch(fetchEventsList());
                console.log("Result Action >>>", resultAction);  // Log the full result action

                const eventsData = resultAction.payload?.events;

                console.log("EVENT DATA >>>>>>>>>>>>", eventsData)

                // If eventsData is a valid array, set the events
                if (Array.isArray(eventsData)) {
                    if (eventsData.length > 0) {
                        setEvents(eventsData);
                    } else {
                        console.warn("No events found in the API response.");
                    }
                } else {
                    console.error("Failed to fetch events:", resultAction.payload?.error || "Unknown error");
                }
            } catch (error) {
                console.error("Error fetching events:", error?.message || "Unknown error", error);
            }
        };

        fetchEvent();
    }, [dispatch]);

    const [editingEventId, setEditingEventId] = useState(null);
    const [editedEvent, setEditedEvent] = useState({ name: '', date: '' });

    useEffect(() => {
        if (events.length > 0) {
            const updatedEvents = events.map(event => {
                const eventDate = dayjs(event.eventDate); // Corrected the field name
                const today = dayjs();
                const countdown = eventDate.diff(today, 'day');
                return { ...event, countdown: `${countdown} days left` };
            });
            setEvents(updatedEvents);
        }
    }, [events]);

    const handleEditClick = (event) => {
        setEditingEventId(event._id);
        setEditedEvent({ name: event.eventName, date: event.eventDate });
    };

    const handleSaveClick = async (eventId) => {
        try {
            await axios.put(`/api/events/${eventId}`, {
                name: editedEvent.name,
                date: editedEvent.date,
            });

            const updatedEvents = events.map(event =>
                event._id === eventId ? { ...event, name: editedEvent.name, eventDate: editedEvent.date } : event // Updated field name
            );
            setEvents(updatedEvents);
            setEditingEventId(null);
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingEventId(null);
    };

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
                            <TableRow key={event.eventID}>
                                <TableCell>{event.eventID}</TableCell>
                                <TableCell>
                                    {editingEventId === event._id ? ( // Use event._id instead of eventID for comparison
                                        <TextField
                                            variant="outlined"
                                            value={editedEvent.name}
                                            onChange={(e) => setEditedEvent({ ...editedEvent, name: e.target.value })}
                                        />
                                    ) : (
                                        event.eventName
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingEventId === event._id ? ( // Use event._id instead of eventDate for comparison
                                        <TextField
                                            variant="outlined"
                                            type="date"
                                            value={dayjs(editedEvent.date).format('YYYY-MM-DD')} // Format date for input
                                            onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
                                        />
                                    ) : (
                                        dayjs(event.eventDate).format('DD MMM YYYY') // Format date for display
                                    )}
                                </TableCell>
                                <TableCell>{event.countdown}</TableCell>
                                <TableCell>
                                    {editingEventId === event._id ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleSaveClick(event._id)}
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
