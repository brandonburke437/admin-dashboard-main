// Temporary API for fetching application data for metrics and table
// Replace with real backend API when ready

// Minimal Application type for API stub
export interface Eligibility {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  birthPlace: string;
  physicallyChallenged: string;
  gender: string;
  region: string;
  district: string;
  residentAddressType: string;
  residentAddress: string;
  residentGPS: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  addressType: string;
  address: string;
  region: string;
  district: string;
  occupation: string;
  employer: string;
}

export interface Education {
  institution: string;
  level: string;
  programme: string;
  class: string;
}

export interface UploadedDocument {
  name: string;
  url: string;
}

export interface AppliedProgram {
  program: string;
  level: string;
  institution: string;
  stemType: string;
  duration: string;
  country: string;
  tuition: string;
  offerStatus: string;
  onScholarship: string;
  scholarshipName: string;
  scholarshipValue: string;
  scholarshipBody: string;
}

export interface Declaration {
  name: string;
  confirmed: boolean;
}

export interface Application {
  applicationId: string;
  applicationType?: string;
  institution?: string;
  program?: string;
  submissionDate?: string;
  status?: string;
  eligibility?: Eligibility;
  emergencyContact?: EmergencyContact;
  education?: Education[];
  uploadedDocuments?: UploadedDocument[];
  appliedProgram?: AppliedProgram;
  personalStatement?: string;
  declaration?: Declaration;
}

// This should match the initialData in DataTable for now
const initialData: Application[] = [
  {
    applicationId: "APP-001",
    applicationType: "Undergraduate",
    institution: "Harvard University",
    program: "Computer Science",
    submissionDate: "2024-05-01",
    status: "Submitted",
    eligibility: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "2000-01-01",
      phone: "+123456789",
      email: "john@example.com",
      birthPlace: "Accra",
      physicallyChallenged: "No",
      gender: "Male",
      region: "Greater Accra",
      district: "Accra Metropolis",
      residentAddressType: "Post Office Box",
      residentAddress: "P.O. Box 123",
      residentGPS: "",
    },
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Mother",
      phone: "+987654321",
      email: "jane@example.com",
      addressType: "Post Office Box",
      address: "P.O. Box 456",
      region: "Greater Accra",
      district: "Accra Metropolis",
      occupation: "Teacher",
      employer: "Accra High School",
    },
    education: [
      {
        institution: "Harvard College",
        level: "Undergraduate",
        programme: "Computer Science",
        class: "First Class",
      },
    ],
    uploadedDocuments: [
      { name: "WAEC Certificate", url: "/docs/waec-app-001.pdf" },
      { name: "Passport Picture", url: "/docs/passport-app-001.jpg" },
    ],
    appliedProgram: {
      program: "Computer Science",
      level: "Undergraduate",
      institution: "Harvard University",
      stemType: "STEM",
      duration: "4 years",
      country: "Ghana",
      tuition: "10000",
      offerStatus: "Unconditional",
      onScholarship: "No",
      scholarshipName: "",
      scholarshipValue: "",
      scholarshipBody: "",
    },
    personalStatement:
      "I am passionate about technology and want to make a difference.",
    declaration: {
      name: "John Doe",
      confirmed: true,
    },
  },
  {
    applicationId: "APP-002",
    applicationType: "Postgraduate",
    institution: "MIT",
    program: "Mechanical Engineering",
    submissionDate: "2024-05-03",
    status: "Under Review",
  },
  {
    applicationId: "APP-003",
    applicationType: "PhD",
    institution: "Stanford University",
    program: "Physics",
    submissionDate: "2024-05-05",
    status: "Approved",
  },
  {
    applicationId: "APP-004",
    applicationType: "Undergraduate",
    institution: "Yale University",
    program: "Economics",
    submissionDate: "2024-05-07",
    status: "Rejected",
  },
  {
    applicationId: "APP-005",
    applicationType: "Postgraduate",
    institution: "Oxford University",
    program: "Philosophy",
    submissionDate: "2024-05-10",
    status: "Submitted",
  },
];

export function fetchApplications(): Promise<Application[]> {
  // Simulate async API
  return new Promise((resolve) => {
    setTimeout(() => resolve(initialData), 200);
  });
}
