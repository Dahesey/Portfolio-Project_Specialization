import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMembersList, updateMember } from '../../../redux/memberRelated/memberHandle';
import { fetchEventsList } from '../../../redux/eventRelated/eventHandle';

const MemberAttendancePage = () => {
  const dispatch = useDispatch();
  const [activeEvent, setActiveEvent] = useState(null);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [checkedInMembers, setCheckedInMembers] = useState([]);
  
  useEffect(() => {
    const fetchEventsData = async () => {
      const resultAction = await dispatch(fetchEventsList());
      const events = resultAction.payload?.events || [];
      determineEvents(events);
    };
    fetchEventsData();
  }, [dispatch]);

  const determineEvents = (events) => {
    let closestDaysLeft = Infinity;
    events.forEach(event => {
      const daysLeft = event.countdown ? parseInt(event.countdown.split(" ")[0]) : Infinity;
      if (daysLeft === 0) {
        setActiveEvent(event);
      } else if (daysLeft > 0 && daysLeft < closestDaysLeft) {
        closestDaysLeft = daysLeft;
      }
    });
  };

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

  // const handleCheckIn = async () => {
  //   const member = members.find(m => m.name === selectedMember);
  //   if (member && activeEvent && !checkedInMembers.find(m => m.id === member.id)) {
  //     const updatedMember = { ...member, lastCheckInDate: activeEvent.date };
  //     console.log("UPDATED MEMEBER >>>",  updatedMember)
  //     console.log("UPDATED MEMEBER ID >>>",  updatedMember._id)
  //     console.log("UPDATED EVENT >>>",  activeEvent)
  //     console.log("UPDATED EVENT ID >>>",  activeEvent.eventDate)
  //     await dispatch(updateMember(updatedMember.id, activeEvent.eventDate));
      
  //     setCheckedInMembers(prev => [...prev, updatedMember]);
  //     setSelectedMember('');
  //   }
  // };

  const handleCheckIn = async () => {
    const member = members.find(m => m.name === selectedMember);
    if (member && activeEvent && !checkedInMembers.find(m => m._id === member._id)) {
      const currentCheckInDate = new Date().toISOString(); // Get the current date and time
      const updatedMember = { ...member, lastCheckInDate: currentCheckInDate };
  
      await dispatch(updateMember(updatedMember.id, { lastCheckInDate: currentCheckInDate }));
  
      setCheckedInMembers(prev => [...prev, updatedMember]);
      setSelectedMember('');
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSelectedMember(input);
    setFilteredMembers(members.filter(member =>
      member.name.toLowerCase().includes(input.toLowerCase())
    ));
  };

  const handleSelectMember = (name) => {
    setSelectedMember(name);
    setFilteredMembers([]);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Current Event Display */}
      <div style={{ backgroundColor: '#4aa3b5', padding: '15px', borderRadius: '5px', color: '#ffcc00', fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' }}>
        Current Event:
      </div>
      {activeEvent ? (
        <div style={{ marginBottom: '20px', fontSize: '16px' }}>
          <strong>Event Name:</strong> {activeEvent.eventName} <br />
          <strong>Event Date:</strong> {new Date(activeEvent.eventDate).toLocaleDateString()} <br />
          <strong>Event Description:</strong> {activeEvent.eventDescription}
        </div>
      ) : (
        <div>No Current Event</div>
      )}
      
      {/* Member Selection with Autocomplete */}
      <div style={{ backgroundColor: '#4aa3b5', padding: '15px', borderRadius: '5px', color: '#ffcc00', fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>
        Select and Search for Member
      </div>
      <input
        type="text"
        value={selectedMember}
        onChange={handleInputChange}
        placeholder="Type to search for a member"
        style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '10px' }}
      />
      {filteredMembers.length > 0 && (
        <div style={{ border: '1px solid #4aa3b5', borderRadius: '5px', maxHeight: '150px', overflowY: 'auto', marginBottom: '10px' }}>
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => handleSelectMember(member.name)}
              style={{ padding: '10px', cursor: 'pointer', backgroundColor: selectedMember === member.name ? '#e0f7fa' : '#ffffff' }}
            >
              {member.name}
            </div>
          ))}
        </div>
      )}

      {/* Check-in Button */}
      <button
        onClick={handleCheckIn}
        style={{
          backgroundColor: '#4aa3b5',
          color: '#ffcc00',
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '5px',
          border: 'none',
          marginBottom: '20px',
          width: '100%',
        }}
      >
        Check in Member
      </button>

      {/* Checked-In Members Table */}
      <div style={{ backgroundColor: '#4aa3b5', padding: '15px', borderRadius: '5px', color: '#ffcc00', fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>
        Table showing the Checked in Members
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#4aa3b5', color: '#ffcc00', fontWeight: 'bold' }}>
            <th style={{ padding: '10px', border: '1px solid #ffcc00' }}>Member Name</th>
            <th style={{ padding: '10px', border: '1px solid #ffcc00' }}>Check-In Date</th>
          </tr>
        </thead>
        <tbody>
          {checkedInMembers.map((member) => (
            <tr key={member.id}>
              <td style={{ padding: '10px', border: '1px solid #4aa3b5' }}>{member.name}</td>
              <td style={{ padding: '10px', border: '1px solid #4aa3b5' }}>{new Date(member.lastCheckInDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberAttendancePage;
