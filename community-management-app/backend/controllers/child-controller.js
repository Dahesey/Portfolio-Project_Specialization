const Child = require('../models/childSchema.js');

// Register a new child
const childRegister = async (req, res) => {
    try {
        // Check if a child with the same name already exists
        const existingChildByName = await Child.findOne({ name: req.body.name });

        // if (existingChildByName) {
        //     return res.status(400).json({ message: 'Child name already exists' });
        // }

        // Create a new Child instance with the request body data
        const child = new Child({
            ...req.body,
        });

        // Save the new child
        let result = await child.save();

        // Return success response with child data
        return res.status(201).json({
            message: 'Successfully registered.',
            child: {
                id: result._id,
                name: result.name,
                // Add other child fields to return as needed, omitting sensitive information
            },
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: 'Server error', error: err.message }); // Send a clear error message
    }
};

// Get a child by ID
const getChildDetail = async (req, res) => {
    try {
        let child = await Child.findById(req.params.id);
        if (child) {
            res.status(200).json(child); // Return the child data
        } else {
            res.status(404).json({ message: "No Child found" }); // Return 404 if no child found
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message }); // Return server error if exception occurs
    }
};

// Get all children
const getAllChildren = async (req, res) => {
    try {
        const children = await Child.find(); // Fetch all children from the database
        res.status(200).json(children); // Return the list of children with status 200
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: err.message }); // Send a clear error message
    }
};

module.exports = { childRegister, getChildDetail, getAllChildren };
