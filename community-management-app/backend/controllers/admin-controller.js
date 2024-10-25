const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js');

const adminRegister = async (req, res) => {
    try {
        // Check if the email or churchName already exists
        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        const existingChurch = await Admin.findOne({ churchName: req.body.churchName });

        if (existingAdminByEmail) {
            res.send({ message: 'Email already exists' });
        } else if (existingChurch) {
            res.send({ message: 'Church name already exists' });
        } else {
            // Hash the password before saving the admin
            const salt = await bcrypt.genSalt(10);  // Generate salt
            const hashedPassword = await bcrypt.hash(req.body.password, salt);  // Hash the password

            // Create a new Admin with the hashed password
            const admin = new Admin({
                ...req.body,
                password: hashedPassword  // Store hashed password
            });

            let result = await admin.save();
            result.password = undefined;  // Hide the password in the response
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// const adminRegister = async (req, res) => {
//     try {
//         // Check if the email or churchName already exists
//         const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
//         const existingChurch = await Admin.findOne({ churchName: req.body.churchName });

//         if (existingAdminByEmail) {
//             return res.status(400).json({ message: 'Email already exists' }); // Return with 400 status
//         } else if (existingChurch) {
//             return res.status(400).json({ message: 'Church name already exists' }); // Return with 400 status
//         } else {
//             // Hash the password before saving the admin
//             const salt = await bcrypt.genSalt(10);  // Generate salt
//             const hashedPassword = await bcrypt.hash(req.body.password, salt);  // Hash the password

//             // Create a new Admin with the hashed password
//             const admin = new Admin({
//                 ...req.body,
//                 password: hashedPassword  // Store hashed password
//             });

//             let result = await admin.save();
//             result.password = undefined;  // Hide the password in the response
//             return res.status(201).json(result);  // Return with 201 Created status
//         }
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };


const adminLogIn = async (req, res) => {
    const { email, password } = req.body;

    // Check for hardcoded admin credentials
    if (email === 'admin@gmail.com' && password === 'baby') {
        return res.status(200).json({ message: 'Login successful', role: 'Admin' });
    }

    // Proceed with database login if it's not the hardcoded admin
    if (email && password) {
        try {
            let admin = await Admin.findOne({ email: email });
            if (admin) {
                const validated = await bcrypt.compare(password, admin.password);
                if (validated) {
                    admin.password = undefined;  // Hide the password in the response
                    res.send(admin);
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
        res.status(400).send({ message: "Email and password are required" });
    }
};

const getAdminDetail = async (req, res) => {
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

module.exports = { adminRegister, adminLogIn, getAdminDetail };
