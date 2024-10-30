// const bcrypt = require('bcrypt');
const Member = require('../models/memberSchema.js');


const memberRegister = async (req, res) => {
    try {
        // Check if the member name already exists
        const existingMemberByName = await Member.findOne({ name: req.body.name });

        if (existingMemberByName) {
            return res.status(400).json({ message: 'Member name already exists' });
        }

        // Create a new Member instance with the request body
        const member = new Member({
            ...req.body,
        });

        // Save the new Member
        let result = await member.save();

        // Return success response with member data
        return res.status(201).json({
            message: 'Successfully registered.',
            member: {
                id: result._id,
                name: result.name,
                // Add other member fields to return as needed, omitting sensitive information
            },
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: 'Server error', error: err.message }); // Send a clear error message
    }
};


// Get a member by ID
const getMemberDetail = async (req, res) => {
    try {
        let member = await Member.findById(req.params.id);
        if (member) {
            // member.password = undefined;
            res.send(member);
        } else {
            res.status(404).json({ message: "No Member found" }); // Return 404 for not found
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all members
const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find(); // Fetch all members from the database
        res.status(200).json(members); // Return the list of members with status 200
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: err.message }); // Send a clear error message
    }
};


// Update a member by ID
const updateMember = async (req, res) => {
    try {
        const memberId = req.params.id;
        const updatedData = req.body;

        // Find and update the member, returning the updated document
        const updatedMember = await Member.findByIdAndUpdate(
            memberId,
            updatedData,
            { new: true } // `new: true` returns the modified document
        );

        if (!updatedMember) {
            return res.status(404).json({ message: 'Member not found' }); // Return 404 if member not found
        }

        return res.status(200).json({
            message: 'Member updated successfully',
            member: updatedMember
        });
    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(500).json({ message: 'Server error', error: err.message }); // Send a clear error message
    }
};


module.exports = { memberRegister, getMemberDetail, getAllMembers, updateMember };

