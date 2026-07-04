const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./src/modules/users/user.model");

// Load env vars
dotenv.config();

const seedAdmin = async () => {
    try {
        if (!process.env.MONGO_URL) {
            console.error("❌ MONGO_URL is missing in your .env file!");
            process.exit(1);
        }

        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ MongoDB Connected!");

        // Check if an admin already exists
        const adminExists = await User.findOne({ role: "admin" });

        if (adminExists) {
            console.log("⚠️ An admin user already exists in the database. Seeding skipped.");
            process.exit(0);
        }

        console.log("Creating default admin user...");

        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        const adminData = {
            employeeId: "ADMIN-001",
            firstName: "Super",
            lastName: "Admin",
            email: "admin@hrms.com",
            password: hashedPassword,
            phone: "+1234567890",
            address: "Admin HQ",
            role: "admin",
            department: "Management",
            designation: "System Administrator",
            joiningDate: new Date(),
            salary: 0,
            isEmailVerified: true,
            isActive: true
        };

        const admin = await User.create(adminData);

        console.log("🎉 Default Admin created successfully!");
        console.log("-----------------------------------------");
        console.log(`Email:    ${admin.email}`);
        console.log(`Password: Admin@123`);
        console.log("-----------------------------------------");
        
        process.exit(0);

    } catch (error) {
        console.error("❌ Error while seeding admin:", error.message);
        process.exit(1);
    }
};

seedAdmin();
