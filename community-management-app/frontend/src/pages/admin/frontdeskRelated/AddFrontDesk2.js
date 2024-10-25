import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Grid, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { registerUser } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";

import { useDispatch, useSelector } from 'react-redux';


// Dummy data for existing members
const existingMembers = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Brown' },
];

const AddFrontDesk2 = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error } = userState;


  const [formData, setFormData] = useState({
    name: '',
    title: '',
    mobile: '',
    email: '',
    dob: '',
    address: '',
    // state: '',
    gender: '',
    department: '',
    occupation: '',
    status: '',
    welfareContribution: '',
    memberSince: '',
    numChildren: '',
    payTithe: '',
    branch: '',
    // memberId: ''
  });

  const [isExistingMember, setIsExistingMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState('');

  const adminID = currentUser._id;
  console.log("ADMIN ID", adminID)
  const role = "Frontdesk";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMemberChange = (e) => {
    const value = e.target.value;
    setSelectedMember(value);
    setIsExistingMember(value === 'Existing Member');

    // Reset formData if existing member is selected
    if (value === 'Existing Member') {
      setFormData({ ...formData, memberId: selectedMember });
    } else {
      // Clear the formData when 'New Member' is selected
      setFormData({
        name: '',
        title: '',
        mobile: '',
        email: '',
        dob: '',
        address: '',
        // state: '',
        gender: '',
        department: '',
        occupation: '',
        status: '',
        welfareContribution: '',
        memberSince: '',
        numChildren: '',
        payTithe: '',
        branch: '',
        // memberId: ''
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Submitted:', formData);
    dispatch(registerUser(formData, role));
  };


  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate(-1);
    } else if (status === "failed") {
      console.log('FAILEDDDDDDDDDDD >>>>:');
      // setMessage(response);
      // setShowPopup(true);
      // setLoader(false);
    } else if (status === "error") {
      console.log('NETWORK ERROR >>>>:');
      // setMessage("Network Error");
      // setShowPopup(true);
      // setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Add New Frontdesk Personnel
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="State / Member Type"
              name="state"
              select
              value={isExistingMember ? 'Existing Member' : 'New Member'}
              onChange={handleMemberChange}
              fullWidth
              required
            >
              <MenuItem value="New Member">New Member</MenuItem>
              <MenuItem value="Existing Member">Existing Member</MenuItem>
            </TextField>
          </Grid>

          {isExistingMember && (
            <Grid item xs={12} md={6}>
              <TextField
                label="Select Existing Member"
                name="memberId"
                select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                fullWidth
                required
              >
                {existingMembers.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {/* Fields for New Member */}
          {!isExistingMember && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Gender"
                  name="gender"
                  select
                  value={formData.gender}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Contribution to Welfare"
                  name="welfareContribution"
                  select
                  value={formData.welfareContribution}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Member Since"
                  name="memberSince"
                  type="date"
                  value={formData.memberSince}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Number of Children"
                  name="numChildren"
                  type="number"
                  value={formData.numChildren}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Do you pay tithe?"
                  name="payTithe"
                  select
                  value={formData.payTithe}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </>
          )}

          {/* Fields for Existing Member */}
          {isExistingMember && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </>
          )}
        </Grid>

        {/* Centering the submit and back button */}
        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleBack}>
            Back
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddFrontDesk2;
