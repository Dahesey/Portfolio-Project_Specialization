const bcrypt = require('bcrypt');
const Finance = require('../models/financeSchema.js');

const financeRegister = async (req, res) => {
    try {
        const admin = new Admin({
            ...req.body
        });

        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });

        if (existingAdminByEmail) {
            res.send({ message: 'Email already exists' });
        } else if (existingSchool) {
            res.send({ message: 'School name already exists' });
        } else {
            let result = await admin.save();
            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const financeLogIn = async (req, res) => {
    const { financeUserName, password } = req.body;

    // Check for hardcoded admin credentials
    if (financeUserName === 'John' && password === 'baby') {
        return res.status(200).json({ message: 'Login successful', role: 'Finance' });
    }

    // Proceed with database login if it's not the hardcoded admin
    if (email && password) {
        try {
            let finance = await Finance.findOne({ financeUserName: financeUserName });
            if (finance) {
                const validated = await bcrypt.compare(password, finance.password);
                if (validated) {
                    finance.password = undefined;  // Hide the password in the response
                    res.send(finance);
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
        res.status(400).send({ message: "UserName and password are required" });
    }
};

const getFinanceDetail = async (req, res) => {
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

// const deleteAdmin = async (req, res) => {
//     try {
//         const result = await Admin.findByIdAndDelete(req.params.id)

//         await Sclass.deleteMany({ school: req.params.id });
//         await Student.deleteMany({ school: req.params.id });
//         await Teacher.deleteMany({ school: req.params.id });
//         await Subject.deleteMany({ school: req.params.id });
//         await Notice.deleteMany({ school: req.params.id });
//         await Complain.deleteMany({ school: req.params.id });

//         res.send(result)
//     } catch (error) {
//         res.status(500).json(err);
//     }
// }

// const updateAdmin = async (req, res) => {
//     try {
//         if (req.body.password) {
//             const salt = await bcrypt.genSalt(10)
//             res.body.password = await bcrypt.hash(res.body.password, salt)
//         }
//         let result = await Admin.findByIdAndUpdate(req.params.id,
//             { $set: req.body },
//             { new: true })

//         result.password = undefined;
//         res.send(result)
//     } catch (error) {
//         res.status(500).json(err);
//     }
// }

module.exports = { financeRegister, financeLogIn, getFinanceDetail };
