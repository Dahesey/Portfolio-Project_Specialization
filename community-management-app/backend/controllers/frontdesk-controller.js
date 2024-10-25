const bcrypt = require('bcrypt');
const Frontdesk = require('../models/frontdeskSchema.js');


const frontdeskRegister = async (req, res) => {
    try {
        // Hash the password before saving the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new Frontdesk instance with hashed password
        const frontdesk = new Frontdesk({
            ...req.body,
            password: hashedPassword, // Use the hashed password
        });

        // Check if the frontdesk name already exists
        const existingFrontdeskByName = await Frontdesk.findOne({ frontdeskName: req.body.frontdeskName });

        if (existingFrontdeskByName) {
            return res.status(400).json({ message: 'Name already exists' });
        } 

        // Save the new frontdesk
        let result = await frontdesk.save();
        result.password = undefined; // Do not return the password in the response
        return res.status(201).json({ message: 'Successfully registered.', frontdesk: result }); // Set status to 201 for resource created
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: 'Server error', error: err.message }); // Send a clear error message
    }
};


const frontdeskLogIn = async (req, res) => {
    const { frontdeskName, password } = req.body;

    // Check for hardcoded admin credentials
    if (frontdeskName === 'Daniel' && password === 'baby') {
        return res.status(200).json({ message: 'Login successful', role: 'Frontdesk' });
    }

    // Proceed with database login if it's not the hardcoded admin
    if (frontdeskName && password) {
        try {
            let frontdesk = await Frontdesk.findOne({ frontdeskName: frontdeskName });
            if (frontdesk) {
                const validated = await bcrypt.compare(password, frontdesk.password);
                if (validated) {
                    frontdesk.password = undefined;  // Hide the password in the response
                    res.send(frontdesk);
                } else {
                    res.status(401).send({ message: "Invalid password" });
                }
            } else {
                res.status(404).send({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).send({ message: "An error occurred", error });
        }
    } else {
        res.status(400).send({ message: "Name and password are required" });
    }
};

const getFrontDeskDetail = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (admin) {
            admin.password = undefined;
            res.send(admin);
        } else {
            res.send({ message: "No admin found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = { frontdeskRegister, frontdeskLogIn, getFrontDeskDetail };
