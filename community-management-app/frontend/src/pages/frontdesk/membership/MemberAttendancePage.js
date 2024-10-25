import React, { useState, useEffect } from 'react';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchMembersList } from '../../../redux/memberRelated/memberHandle'; // Redux action to fetch members
import { fetchEventsList } from '../../../redux/eventRelated/eventHandle'; // Redux action to fetch events
import dayjs from 'dayjs';

const MemberAttendancePage = () => {
    const dispatch = useDispatch();
    const [members, setMembers] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('');
    const [isEventSelected, setIsEventSelected] = useState(false); // To make event field read-only once selected

    // Fetch members when the component mounts
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const resultAction = await dispatch(fetchMembersList());
                const membersData = resultAction.payload?.members;

                if (Array.isArray(membersData)) {
                    setMembers(membersData);
                } else {
                    console.error("Failed to fetch members:", resultAction.payload?.error || "Unknown error");
                }
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        fetchMembers();
    }, [dispatch]);

    // Fetch events when the component mounts
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const resultAction = await dispatch(fetchEventsList());
                const eventsData = resultAction.payload?.events;
                console.log("EVENTS >>>>> ", eventsData)

                if (Array.isArray(eventsData)) {
                    setEvents(eventsData);
                } else {
                    console.error("Failed to fetch events:", resultAction.payload?.error || "Unknown error");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvent();
    }, [dispatch]);

    const handleMemberChange = (event) => {
        setSelectedMember(event.target.value);
    };

    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
        setIsEventSelected(true); // Make event field read-only once selected
    };

    const handleCheckInClick = async () => {
        if (selectedMember && selectedEvent) {
            // Perform the logic to add the selected member to the selected event's attendees array
            // Increase the check-in count (e.g., by updating the event details)

            // You would make an API request to update both the member and the event data here
            console.log(`Checking in member ${selectedMember} for event ${selectedEvent}`);
        } else {
            console.error("Please select both a member and an event before checking in.");
        }
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Check-in Members for Events</Typography>

            {/* Event Dropdown */}
            <Typography variant="h6" gutterBottom>Select Event</Typography>
            <Select
                value={selectedEvent}
                onChange={handleEventChange}
                disabled={isEventSelected} // Make the event dropdown read-only after selection
                fullWidth
                displayEmpty
            >
                <MenuItem value="" disabled>Select an Event</MenuItem>
                {events.map((event) => (
                    <MenuItem key={event._id} value={event._id}>
                        {/* Event Name followed by Event Date */}
                        {`${event.eventName} - ${dayjs(event.date).format('DD/MM/YYYY')}`}
                    </MenuItem>
                ))}
            </Select>

            {/* Member Dropdown */}
            <Typography variant="h6" gutterBottom>Select Member</Typography>
            <Select
                value={selectedMember}
                onChange={handleMemberChange}
                fullWidth
                displayEmpty
            >
                <MenuItem value="" disabled>Select a Member</MenuItem>
                {members.map((member) => (
                    <MenuItem key={member._id} value={member._id}>
                        {/* Title first, then Name */}
                        {`${member.title} ${member.name}`}
                    </MenuItem>
                ))}
            </Select>

            {/* Check-in Button */}
            <Box sx={{ marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleCheckInClick}>
                    Check In Member
                </Button>
            </Box>
        </Box>
    );
};

export default MemberAttendancePage;
