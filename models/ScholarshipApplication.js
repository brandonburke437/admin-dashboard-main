const mongoose = require("mongoose");

const ScholarshipApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Stage 1 – Personal Info
  fullName: String,
  dateOfBirth: Date,
  phone: String,
  email: String,
  placeOfBirth: String,
  region: String,
  district: String,
  gender: String,
  isPhysicallyChallenged: Boolean,
  residentialAddressType: String,
  residentialAddress: String,

  // Stage 2 – Emergency Contact
  emergencyContactName: String,
  emergencyContactPhone: String,
  emergencyContactEmail: String,
  emergencyContactRelationship: String,
  emergencyContactRegion: String,
  emergencyContactAddress: String,

  // Occupation Info
  occupation: String,
  employerName: String,
  companyName: String,

  // Education Info
  institution: String,
  educationLevel: String,
  program: String,
  class: String,
  countryOfInstitution: String,
  yearOfEntry: Number,
  yearOfCompletion: Number,

  // Applied Program Info
  appliedProgram: String,
  appliedLevel: String,
  appliedInstitution: String,
  stemOption: String,
  duration: String,
  appliedCountry: String,
  tuitionFees: Number,
  conditionalOffer: String,

  // Scholarship Details
  hasOtherScholarship: Boolean,
  isPastGnpcBeneficiary: Boolean,
  justification: String,

  // Uploaded Documents
  documents: [
    {
      type: { type: String },
      fileUrl: String,
    }
  ],

  applicantType: {
    type: String,
    enum: ['postgraduate', 'undergraduate', 'continuing'],
    required: true
  },

  gpa: Number,
  applicationDeadline: Date,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("ScholarshipApplication", ScholarshipApplicationSchema);
