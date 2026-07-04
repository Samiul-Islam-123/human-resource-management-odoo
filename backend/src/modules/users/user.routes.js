const express = require("express");
const userController = require("./user.controller");
const { protect, authorizeRoles } = require("../../middlewares/auth.middleware");

const userRouter = express.Router();

// All user routes require authentication
userRouter.use(protect);

/* Employee Management */

// Create a new employee (HR/Admin only)
userRouter.post("/add-employee", authorizeRoles("admin", "hr"), userController.addEmployee);

// Get all employees (HR/Admin only)
userRouter.get("/", authorizeRoles("admin", "hr"), userController.getAllEmployees);

// Search employees (HR/Admin only) - Note: put search before :id to prevent matching search as an id
userRouter.get("/search/query", authorizeRoles("admin", "hr"), userController.searchEmployees);

// Get employees by department (HR/Admin only)
userRouter.get(
    "/department/:department",
    authorizeRoles("admin", "hr"),
    userController.getEmployeesByDepartment
);

// Get employees by role (HR/Admin only)
userRouter.get("/role/:role", authorizeRoles("admin", "hr"), userController.getEmployeesByRole);

// Get employee by ID (HR/Admin only)
userRouter.get("/:id", authorizeRoles("admin", "hr"), userController.getEmployeeById);

// Update employee details (HR/Admin only)
userRouter.patch("/:id", authorizeRoles("admin", "hr"), userController.updateEmployee);

// Delete an employee (HR/Admin only)
userRouter.delete("/:id", authorizeRoles("admin", "hr"), userController.deleteEmployee);


/* Profile */

// Get logged-in user's profile
userRouter.get("/profile/me", userController.getMyProfile);

// Update logged-in user's profile
userRouter.patch("/profile/me", userController.updateMyProfile);

// Update logged-in user's password
userRouter.patch("/profile/me/password", userController.updateMyPassword);

// Update profile picture
userRouter.patch(
    "/profile/me/profile-picture",
    userController.updateProfilePicture
);


/* Documents */

// Add a document to employee profile (HR/Admin only)
userRouter.post("/:id/documents", authorizeRoles("admin", "hr"), userController.addDocument);

// Remove a document from employee profile (HR/Admin only)
userRouter.delete(
    "/:id/documents/:documentId",
    authorizeRoles("admin", "hr"),
    userController.deleteDocument
);


/* Employee Status */

// Activate employee (HR/Admin only)
userRouter.patch("/:id/activate", authorizeRoles("admin", "hr"), userController.activateEmployee);

// Deactivate employee (HR/Admin only)
userRouter.patch("/:id/deactivate", authorizeRoles("admin", "hr"), userController.deactivateEmployee);


module.exports = userRouter;