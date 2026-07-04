const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        samplePassword: {
            type: String,
            default: null
        },

        phone: {
            type: String,
            default: null
        },

        address: {
            type: String,
            default: null
        },

        role: {
            type: String,
            enum: ["employee", "admin"],
            default: "employee"
        },

        department: {
            type: String,
            default: null
        },

        designation: {
            type: String,
            default: null
        },

        joiningDate: {
            type: Date,
            default: Date.now
        },

        salary: {
            type: Number,
            default: 0
        },

        leaveBalance: {
            type: Number,
            default: 0
        },

        profilePicture: {
            type: String,
            default: null
        },

        documents: [
            {
                name: {
                    type: String,
                    required: true
                },

                url: {
                    type: String,
                    required: true
                },

                uploadedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        isEmailVerified: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserSchema);