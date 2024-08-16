const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const employeeSchema = new mongoose.Schema({
  companyId: { type: ObjectId, ref: "Company" },

  // Personal Information
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  bloodGroup: { type: String, required: true },
  maritalStatus: { type: String, required: true },

  // Work Information
  employeeId: { type: String, required: true },
  departmentId: { type: ObjectId, ref: "Department" },
  subDepartmentId: { type: ObjectId },
  designationId: { type: ObjectId, ref: "Designation" },
  jobTitle: { type: String },
  reportingManagerId: { type: ObjectId },
  workLocation: { type: String, required: true },
  employeeType: {
    type: String,
    enum: ["Full Time", "Part Time", "Contract"],
    required: true,
  },
  probationPeriod: { type: Number, required: true },
  probationStatus: {
    type: String,
    enum: ["Confirmed", "Probation"],
    required: true,
  },
  dateOfJoining: { type: Date, required: true },
  ctc: { type: Number },

  // Bank Details
  bankDetails: {
    accountHolderName: { type: String },
    bankName: { type: String },
    city: { type: String },
    branchName: { type: String },
    ifscCode: { type: String },
    accountNumber: { type: String },
  },

  // Addresses
  addresses: {
    currentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    houseType: { type: String, required: true },
    currentResidenceSince: { type: Date, required: true },
    currentCitySince: { type: Date, required: true },
  },

  // Social Profile
  socialProfile: {
    linkedin: { type: String },
    facebook: { type: String },
    twitter: { type: String },
  },

  // Status and Role
  status: { type: String },
  roleId: { type: ObjectId, ref: "Role" },

  // Work History
  workHistory: [
    {
      department: { type: String, required: true },
      designation: { type: String, required: true },
      from: { type: Date, required: true },
      to: { type: Date },
    },
  ],
});

module.exports = mongoose.model("Employee", employeeSchema);
