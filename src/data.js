
export const departments = [
  {
    id: 1,
    name: "Physiotherapy",
    description: "Improve physical movement, flexibility and muscle strength.",
    keywords: [
      "physio", "physiotherapy", "physical therapy",
      "muscle pain", "muscle stiffness", "muscle weakness",
      "muscle spasm", "muscle tightness", "muscle strain",
      "frozen shoulder", "shoulder stiffness",
      "stretching", "flexibility", "muscle cramps",
      "restricted movement", "muscle soreness",
      "strengthening exercises", "physical exercise",
      "tight muscles", "stiff muscles", "muscle fatigue",
      "reduced flexibility", "movement therapy"
    ]
  },
  {
    id: 2,
    name: "Pain Management",
    description: "Specialist consultations for persistent and chronic pain.",
    keywords: [
      "chronic pain", "persistent pain", "constant pain",
      "long term pain", "long lasting pain",
      "nerve pain", "burning pain", "shooting pain",
      "body pain", "widespread pain", "pain relief",
      "pain management", "fibromyalgia", "neuralgia",
      "neuropathic pain", "unbearable pain",
      "recurring pain", "ongoing pain", "pain treatment",
      "pain consultation", "pain medication",
      "pain for months", "pain for years"
    ]
  },
  {
    id: 3,
    name: "Sports Injury",
    description: "Sports-related injury consultations and physical recovery.",
    keywords: [
      "sports injury", "sports", "football injury",
      "cricket injury", "gym injury", "running injury",
      "ankle sprain", "sprain", "acl tear", "acl injury",
      "meniscus tear", "hamstring injury", "hamstring",
      "ligament injury", "ligament tear", "tendon injury",
      "tennis elbow", "golfer elbow", "golfer's elbow",
      "runner knee", "runner's knee", "athlete",
      "workout injury", "training injury",
      "shin splints", "sports recovery", "tendon strain",
      "twisted ankle", "achilles tendon"
    ]
  },
  {
    id: 4,
    name: "Spine Care",
    description: "Specialized consultations for back, neck and spinal concerns.",
    keywords: [
      "back pain", "lower back pain", "upper back pain",
      "middle back pain", "neck pain", "spine pain",
      "spinal pain", "backache", "neck stiffness",
      "sciatica", "slip disc", "slipped disc",
      "herniated disc", "bulging disc", "disc pain",
      "cervical pain", "cervical", "lumbar pain",
      "lumbar", "spondylitis", "spondylosis",
      "scoliosis", "spinal stenosis", "tailbone pain",
      "back stiffness", "spine", "back", "neck",
      "coccyx pain", "sacroiliac pain"
    ]
  },
  {
    id: 5,
    name: "Rehabilitation",
    description: "Structured recovery support following surgery or treatment.",
    keywords: [
      "rehabilitation", "rehab", "recovery",
      "post surgery", "after surgery", "post operative",
      "post operation", "surgical recovery",
      "joint replacement", "knee replacement",
      "hip replacement", "post fracture",
      "after fracture", "regain strength",
      "recovery exercises", "recovery therapy",
      "post hospital recovery", "recovery program",
      "physical recovery", "post surgical therapy",
      "recovery after operation"
    ]
  },
  {
    id: 6,
    name: "Orthopedic Care",
    description: "Consultations for bone, joint and musculoskeletal conditions.",
    keywords: [
      "orthopedic", "orthopaedic", "bone pain",
      "joint pain", "knee pain", "hip pain",
      "elbow pain", "wrist pain", "ankle pain",
      "shoulder pain", "arthritis", "osteoarthritis",
      "rheumatoid arthritis", "joint stiffness",
      "joint swelling", "swollen knee", "bone weakness",
      "joint problems", "cartilage damage",
      "bone density", "leg pain", "foot pain",
      "heel pain", "plantar fasciitis",
      "bursitis", "bone disorder"
    ]
  },
  {
    id: 7,
    name: "Neurological Rehabilitation",
    description: "Rehabilitation support for diagnosed neurological conditions.",
    keywords: [
      "neuro rehab", "neurological rehabilitation",
      "stroke recovery", "post stroke",
      "parkinson", "parkinson's disease",
      "multiple sclerosis", "cerebral palsy",
      "neurological disorder", "neurological therapy",
      "spasticity", "motor control",
      "coordination problems", "neurological recovery",
      "brain injury rehabilitation",
      "spinal cord injury rehabilitation",
      "stroke rehabilitation", "neuro physiotherapy",
      "movement disorder"
    ]
  },
  {
    id: 8,
    name: "Chiropractic Care",
    description: "Consultations for appropriate manual musculoskeletal care.",
    keywords: [
      "chiropractic", "chiropractor",
      "spinal adjustment", "manual adjustment",
      "manual therapy", "posture correction",
      "poor posture", "postural imbalance",
      "postural assessment", "rounded shoulders",
      "forward head posture", "desk posture",
      "sitting posture", "ergonomic assessment",
      "body alignment", "posture problems",
      "chiropractic consultation"
    ]
  },
  {
    id: 9,
    name: "Geriatric Physiotherapy",
    description: "Physical rehabilitation and mobility support for older adults.",
    keywords: [
      "geriatric", "elderly", "senior citizen",
      "old age", "age related weakness",
      "elderly care", "elderly mobility",
      "fall prevention", "frequent falls",
      "balance training", "walking support",
      "walking difficulty", "walking problems",
      "age related stiffness", "senior fitness",
      "mobility for seniors", "elderly exercise",
      "geriatric rehabilitation",
      "age related mobility", "elderly physiotherapy"
    ]
  },
  {
    id: 10,
    name: "Occupational Therapy",
    description: "Support for everyday activities and functional independence.",
    keywords: [
      "occupational therapy", "occupational therapist",
      "daily activities", "daily tasks",
      "hand coordination", "fine motor skills",
      "hand function", "grip weakness",
      "difficulty writing", "difficulty dressing",
      "difficulty eating", "difficulty bathing",
      "functional independence", "self care",
      "adaptive equipment", "hand rehabilitation",
      "workplace adaptation", "sensory integration",
      "functional training", "daily living skills"
    ]
  }
];

const doctorProfiles = [
  { id: 1, name: "Dr. Shashank", departmentId: 1, experience: 2 },
  { id: 2, name: "Dr. Kapoor", departmentId: 2, experience: 4 },
  { id: 3, name: "Dr. Sahil", departmentId: 3, experience: 6 },
  { id: 4, name: "Dr. Sharma", departmentId: 4, experience: 8 },
  { id: 5, name: "Dr. Mehta", departmentId: 5, experience: 10 },

  { id: 6, name: "Dr. Riya", departmentId: 1, experience: 5 },
  { id: 7, name: "Dr. Malhotra", departmentId: 2, experience: 12 },
  { id: 8, name: "Dr. Arjun", departmentId: 3, experience: 7 },
  { id: 9, name: "Dr. Verma", departmentId: 4, experience: 11 },
  { id: 10, name: "Dr. Neha", departmentId: 5, experience: 6 },

  { id: 11, name: "Dr. Patel", departmentId: 6, experience: 14 },
  { id: 12, name: "Dr. Desai", departmentId: 6, experience: 9 },
  { id: 13, name: "Dr. Rao", departmentId: 7, experience: 13 },
  { id: 14, name: "Dr. Iyer", departmentId: 7, experience: 8 },
  { id: 15, name: "Dr. Shah", departmentId: 8, experience: 10 },
  { id: 16, name: "Dr. Karan", departmentId: 8, experience: 5 },
  { id: 17, name: "Dr. Joshi", departmentId: 9, experience: 15 },
  { id: 18, name: "Dr. Anjali", departmentId: 9, experience: 7 },
  { id: 19, name: "Dr. Gupta", departmentId: 10, experience: 9 },
  { id: 20, name: "Dr. Priya", departmentId: 10, experience: 6 }
];

export const doctors = doctorProfiles.map(profile => {
  const department = departments.find(
    d => d.id === profile.departmentId
  );

  return {
    ...profile,
    service: department.name,
    description: department.description,
    keywords: department.keywords
  };
});

export const timeSlots = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "04:00 PM"
];
