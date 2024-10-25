// const bcrypt = require('bcrypt');
const Member = require('../models/memberSchema.js');

// Register a new member
// const memberRegister = async (req, res) => {
//     try {
//         const member = new Member({
//             ...req.body,
//         });

//         // Check if the Member name already exists
//         const existingMemberByName = await Member.findOne({ name: req.body.name });

//         if (existingMemberByName) {
//             return res.status(400).json({ message: 'Member Name already exists' });
//         }

//         // Save the new Member
//         let result = await member.save();
//         // result.password = undefined; // Do not return the password in the response
//         return res.status(201).json({ message: 'Successfully registered.', member: result }); // Set status to 201 for resource created
//     } catch (err) {
//         console.error(err); // Log the error for debugging
//         return res.status(500).json({ message: 'Server error', error: err.message }); // Send a clear error message
//     }
// };


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

module.exports = { memberRegister, getMemberDetail, getAllMembers };



































// // const bcrypt = require('bcrypt');
// const Member = require('../models/memberSchema.js');


// const memberRegister = async (req, res) => {
//     try {

//         const member = new Member({
//             ...req.body,
            
//         });


//         // Check if the Member name already exists
//         const existingMemberByName = await Member.findOne({ name: req.body.name });

//         if (existingMemberByName) {
//             return res.status(400).json({ message: 'Member Name already exists' });
//         } 

//         // Save the new Member
//         let result = await member.save();
//         // result.password = undefined; // Do not return the password in the response
//         return res.status(201).json({ message: 'Successfully registered.', member: result }); // Set status to 201 for resource created
//     } catch (err) {
//         console.error(err); // Log the error for debugging
//         return res.status(500).json({ message: 'Server error', error: err.message }); // Send a clear error message
//     }
// };




// const getMemberDetail = async (req, res) => {
//     try {
//         let member = await Member.findById(req.params.id);
//         if (member) {
//             // member.password = undefined;
//             res.send(member);
//         } else {
//             res.send({ message: "No Member found" });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }


// module.exports = { memberRegister, getMemberDetail };
