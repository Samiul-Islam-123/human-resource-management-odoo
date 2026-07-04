const bcrypt = require("bcryptjs");
const User = require("./user.model");
const { logger } = require("../../utils/Logger");
const { generateToken } = require("../../utils/jwt"); // Fixed capitalization if any issue

/* -------------------------------------------------------------------------- */
/* Create Employee */
/* -------------------------------------------------------------------------- */
const addEmployee = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
            role,
            department,
            designation,
            joiningDate,
            salary,
            leaveBalance,
            profilePicture,
            documents
        } = req.body;

        const existingEmployee = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingEmployee) {
            return res.status(409).json({
                success: false,
                message: "Employee with this email already exists."
            });
        }

        // Auto-generate employeeId
        const joinYear = joiningDate ? new Date(joiningDate).getFullYear() : new Date().getFullYear();
        const startOfYear = new Date(joinYear, 0, 1);
        const endOfYear = new Date(joinYear, 11, 31, 23, 59, 59, 999);
        
        const countThisYear = await User.countDocuments({
            joiningDate: { $gte: startOfYear, $lte: endOfYear }
        });

        const serialStr = String(countThisYear + 1).padStart(4, '0');
        const firstTwoFirst = (firstName.slice(0, 2) || '').padEnd(2, 'X').toUpperCase();
        const firstTwoLast = (lastName.slice(0, 2) || '').padEnd(2, 'X').toUpperCase();
        
        const employeeId = `OI${firstTwoFirst}${firstTwoLast}${joinYear}${serialStr}`;

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = await User.create({
            employeeId,
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            samplePassword: password, // Store the raw password for admin viewing
            phone,
            address,
            role,
            department,
            designation,
            joiningDate,
            salary,
            leaveBalance: leaveBalance || 0,
            profilePicture,
            documents
        });

        const employeeData = employee.toObject();
        delete employeeData.password;

        res.status(201).json({
            success: true,
            message: "Employee created successfully.",
            data: employeeData
        });

    } catch (error) {
        logger.error(`Error while creating employee: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Failed to create employee."
        });
    }
};

/* -------------------------------------------------------------------------- */
/* Get All Employees */
/* -------------------------------------------------------------------------- */
const getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Employees fetched successfully",
            data: {
                count: employees.length,
                employees
            }
        });

    } catch (error) {
        logger.error(`Error while fetching employees: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Failed to fetch employees."
        });
    }
};

/* -------------------------------------------------------------------------- */
/* Get Employee By ID */
/* -------------------------------------------------------------------------- */
const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await User.findById(id).select("-password");

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee fetched successfully",
            data: employee
        });

    } catch (error) {
        logger.error(`Error while fetching employee: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Failed to fetch employee."
        });
    }
};

/* -------------------------------------------------------------------------- */
/* Update Employee */
/* -------------------------------------------------------------------------- */
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        delete updates.password;
        delete updates.email;
        delete updates.employeeId;

        const employee = await User.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).select("-password");

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee updated successfully.",
            data: employee
        });

    } catch (error) {
        logger.error(`Error while updating employee: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Failed to update employee."
        });
    }
};

/* -------------------------------------------------------------------------- */
/* Delete Employee */
/* -------------------------------------------------------------------------- */
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await User.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully."
        });

    } catch (error) {
        logger.error(`Error while deleting employee: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Failed to delete employee."
        });
    }
};

/* -------------------------------------------------------------------------- */
/* Get My Profile */
/* -------------------------------------------------------------------------- */
const getMyProfile = async (req, res) => {
    try {
        const employee = await User.findById(req.user._id).select("-password -samplePassword");
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Profile not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: employee
        });
    } catch (error) {
        logger.error(`Error while fetching profile: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Failed to fetch profile."
        });
    }
};

/* -------------------------------------------------------------------------- */
/* Update My Profile */
/* -------------------------------------------------------------------------- */
const updateMyProfile = async (req, res) => {
    try {
        const updates = { ...req.body };
        
        // Prevent employee from updating sensitive fields
        const restrictedFields = ['employeeId', 'email', 'password', 'role', 'salary', 'joiningDate', 'isActive', 'isEmailVerified'];
        restrictedFields.forEach(field => delete updates[field]);

        const employee = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: employee
        });
    } catch (error) {
        logger.error(`Error while updating profile: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Failed to update profile."
        });
    }
};

/* -------------------------------------------------------------------------- */
/* Update My Password */
/* -------------------------------------------------------------------------- */
const updateMyPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await User.findByIdAndUpdate(req.user._id, { password: hashedPassword, samplePassword: newPassword });

        res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });
    } catch (error) {
        logger.error(`Error while updating password: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Failed to update password."
        });
    }
};

/* -------------------------------------------------------------------------- */
/* Update Profile Picture */
/* -------------------------------------------------------------------------- */
const updateProfilePicture = async (req, res) => {
    try {
        const { profilePicture } = req.body;

        if (!profilePicture) {
            return res.status(400).json({
                success: false,
                message: "Profile picture URL is required."
            });
        }

        const employee = await User.findByIdAndUpdate(
            req.user._id,
            { profilePicture },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Profile picture updated successfully.",
            data: employee
        });
    } catch (error) {
        logger.error(`Error while updating profile picture: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Failed to update profile picture."
        });
    }
};

/* -------------------------------------------------------------------------- */
/* Add Document */
/* -------------------------------------------------------------------------- */
const addDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, url, publicId, mimeType } = req.body;

        if (!name || !url) {
            return res.status(400).json({
                success: false,
                message: "Document name and URL are required."
            });
        }

        const employee = await User.findByIdAndUpdate(
            id,
            {
                $push: {
                    documents: { name, url, publicId, mimeType }
                }
            },
            { new: true, runValidators: true }
        ).select("-password");

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Document added successfully.",
            data: employee
        });
    } catch (error) {
        logger.error(`Error while adding document: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Failed to add document."
        });
    }
};

/* -------------------------------------------------------------------------- */
/* Delete Document */
/* -------------------------------------------------------------------------- */
const deleteDocument = async (req, res) => {
    try {
        const { id, documentId } = req.params;

        const employee = await User.findByIdAndUpdate(
            id,
            {
                $pull: { documents: { _id: documentId } }
            },
            { new: true }
        ).select("-password");

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Document deleted successfully.",
            data: employee
        });
    } catch (error) {
        logger.error(`Error while deleting document: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Failed to delete document."
        });
    }
};

/* -------------------------------------------------------------------------- */
/* Activate Employee */
/* -------------------------------------------------------------------------- */
const activateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await User.findByIdAndUpdate(id, { isActive: true }, { new: true }).select("-password");
        
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found." });
        }

        res.status(200).json({
            success: true,
            message: "Employee activated successfully.",
            data: employee
        });
    } catch (error) {
        logger.error(`Error activating employee: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to activate employee." });
    }
};

/* -------------------------------------------------------------------------- */
/* Deactivate Employee */
/* -------------------------------------------------------------------------- */
const deactivateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await User.findByIdAndUpdate(id, { isActive: false }, { new: true }).select("-password");
        
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found." });
        }

        res.status(200).json({
            success: true,
            message: "Employee deactivated successfully.",
            data: employee
        });
    } catch (error) {
        logger.error(`Error deactivating employee: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to deactivate employee." });
    }
};

/* -------------------------------------------------------------------------- */
/* Search Employees */
/* -------------------------------------------------------------------------- */
const searchEmployees = async (req, res) => {
    try {
        const { q } = req.query; // Assuming q is the query param for search
        const query = q ? {
            $or: [
                { firstName: { $regex: q, $options: 'i' } },
                { lastName: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } },
                { employeeId: { $regex: q, $options: 'i' } }
            ]
        } : {};

        const employees = await User.find(query).select("-password").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Employees searched successfully",
            data: {
                count: employees.length,
                employees
            }
        });
    } catch (error) {
        logger.error(`Error searching employees: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to search employees." });
    }
};

/* -------------------------------------------------------------------------- */
/* Get Employees by Department */
/* -------------------------------------------------------------------------- */
const getEmployeesByDepartment = async (req, res) => {
    try {
        const { department } = req.params;
        const employees = await User.find({ department: { $regex: new RegExp(`^${department}$`, 'i') } }).select("-password");

        res.status(200).json({
            success: true,
            message: "Employees fetched successfully",
            data: {
                count: employees.length,
                employees
            }
        });
    } catch (error) {
        logger.error(`Error fetching employees by department: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to fetch employees." });
    }
};

/* -------------------------------------------------------------------------- */
/* Get Employees by Role */
/* -------------------------------------------------------------------------- */
const getEmployeesByRole = async (req, res) => {
    try {
        const { role } = req.params;
        const employees = await User.find({ role: { $regex: new RegExp(`^${role}$`, 'i') } }).select("-password");

        res.status(200).json({
            success: true,
            message: "Employees fetched successfully",
            data: {
                count: employees.length,
                employees
            }
        });
    } catch (error) {
        logger.error(`Error fetching employees by role: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to fetch employees." });
    }
};

module.exports = {
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getMyProfile,
    updateMyProfile,
    updateMyPassword,
    updateProfilePicture,
    addDocument,
    deleteDocument,
    activateEmployee,
    deactivateEmployee,
    searchEmployees,
    getEmployeesByDepartment,
    getEmployeesByRole
};