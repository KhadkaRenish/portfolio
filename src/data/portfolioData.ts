export const profile = {
  name: "Renish Khadka",
  role: "QA Automation Engineer",
  email: "renishkhadka7@gmail.com",
  location: "Nepal",
  linkedin: "https://www.linkedin.com/in/renishkhadka",
  github: "https://github.com/renishkhadka",
  resumeUrl: "/Renish-Khadka-Resume.pdf",
  intro:
    "QA Automation Engineer focused on backend quality, API testing, business logic validation, database testing, and automation frameworks.",
  mindset:
    "I test like a user, investigate like an engineer, and automate the repeated release risks that slow teams down.",
  experience: [
    {
      title: "QA Automation Engineer",
      company: "Current focus",
      detail:
        "Building release confidence through API checks, regression automation, database validation, and careful bug analysis.",
    },
    {
      title: "QA Internship",
      company: "Intuji",
      detail:
        "Worked in a real product team context with test cases, bug reports, regression coverage, and web quality workflows.",
    },
  ],
};

export const skills = [
  {
    name: "QA Automation",
    level: 90,
    detail: "I design maintainable automated checks that protect important release paths and reduce repeated manual effort.",
  },
  {
    name: "API Testing",
    level: 88,
    detail:
      "I validate request and response behavior, status codes, payload structure, authentication, error handling, and database impact.",
  },
  {
    name: "SQL Validation",
    level: 85,
    detail: "I verify that application actions create correct database state, relationships, calculations, and persisted values.",
  },
  {
    name: "Backend Testing",
    level: 87,
    detail: "I focus on business rules, service behavior, data correctness, error states, and release-critical backend paths.",
  },
  {
    name: "Playwright/Selenium",
    level: 82,
    detail: "I automate browser workflows with reusable selectors, clear assertions, and checks that mirror real user journeys.",
  },
  {
    name: "CI/CD Testing",
    level: 78,
    detail: "I help teams run reliable automated checks in release pipelines so failures appear before production.",
  },
  {
    name: "Bug Analysis",
    level: 92,
    detail: "I isolate root causes, write useful reproduction steps, capture evidence, and communicate risk clearly.",
  },
  {
    name: "Test Strategy",
    level: 86,
    detail: "I turn requirements into focused coverage across happy paths, edge cases, negative tests, and regression areas.",
  },
];

export const projects = [
  {
    title: "Finance Tracker App",
    caseType: "Business Logic Validation",
    mission:
      "Validate income, expenses, budget, goals, safe spend, and monthly summary.",
    stack: ["React Native", "Expo", "SQLite", "TypeScript"],
    qaFocus: [
      "Business rule validation",
      "Local database testing",
      "Budget calculation testing",
      "Edge case scenarios",
      "Notification testing",
    ],
  },
  {
    title: "Backend API Automation Framework",
    caseType: "Backend Quality Automation",
    mission: "Catch backend issues before release.",
    stack: ["API testing", "Database validation", "TypeScript/Python", "CI/CD"],
    qaFocus: [
      "API contract testing",
      "SQL validation",
      "Negative testing",
      "Reusable framework",
      "Failure reporting",
    ],
  },
  {
    title: "Bug Hunter Portfolio Game",
    caseType: "Interactive Portfolio Engineering",
    mission: "Build a playable portfolio where visitors discover profile data through QA missions.",
    stack: ["React", "Three.js", "React Three Fiber", "Tailwind CSS", "Framer Motion"],
    qaFocus: ["Interaction testing", "Responsive UX checks", "Performance awareness", "Recruiter-friendly fallback"],
  },
];

export const qaMissionSkills = [
  "API Testing",
  "SQL Validation",
  "Backend Testing",
  "Authentication Testing",
  "Regression Testing",
  "Business Logic Testing",
  "Automation Framework",
  "Test Strategy",
  "Data Integrity Testing",
  "Product Quality Thinking",
];

export const missionCheckpoints = [
  {
    id: "api-bug",
    title: "API Data Sync Failure",
    shortLabel: "API Bug",
    position: [-13, 0, -2],
    color: "#38bdf8",
    severity: "Critical",
    system: "API + Database",
    alert: "API returned 200 OK, but the user balance was not updated in the database.",
    task: "Choose the best QA investigation step.",
    scenario: "API returns 200 OK, but the database value is not updated.",
    choices: [
      "Trust the 200 status code",
      "Validate response payload, backend business rule, and database state",
      "Restart the browser",
      "Ignore because UI looks fine",
    ],
    correctAnswer: 1,
    explanation:
      "Bug fixed. Renish does not trust status code alone. He validates API response, database state, and business rule behavior.",
    unlocks: ["API Testing", "Backend Validation"],
    achievement: "api-guardian",
  },
  {
    id: "database-bug",
    title: "Database Transaction Mismatch",
    shortLabel: "Database Bug",
    position: [-6, 0, -14],
    color: "#34d399",
    severity: "High",
    system: "Database",
    alert: "Frontend confirms transaction success, but no matching transaction ID exists in the database.",
    task: "Choose the best data integrity investigation.",
    scenario: "Frontend shows a transaction was saved, but no matching record exists in the database.",
    choices: [
      "Check only the frontend success message",
      "Validate database record, transaction ID, API response, and data consistency",
      "Ask user to try again only",
      "Skip the test",
    ],
    correctAnswer: 1,
    explanation:
      "Renish would compare UI confirmation, API response, and database records to catch data integrity issues.",
    unlocks: ["SQL Validation", "Data Integrity Testing"],
    achievement: "database-defender",
  },
  {
    id: "auth-bug",
    title: "Expired Token Access Bug",
    shortLabel: "Auth Bug",
    position: [7, 0, -8],
    color: "#a78bfa",
    severity: "Critical",
    system: "Authentication",
    alert: "A user can access protected data after the token expires.",
    task: "Choose the best security-focused QA action.",
    scenario: "A user can still access protected data after the token expires.",
    choices: [
      "Test expired token, unauthorized access, role permissions, and 401/403 responses",
      "Increase token time only",
      "Ignore it because login works",
      "Clear browser cache",
    ],
    correctAnswer: 0,
    explanation:
      "Renish would validate authentication expiry, authorization rules, and protected API responses.",
    unlocks: ["Authentication Testing", "Security Mindset"],
    achievement: "auth-protector",
  },
  {
    id: "regression-bug",
    title: "Regression Failure After Release",
    shortLabel: "Regression Bug",
    position: [14, 0, -18],
    color: "#f472b6",
    severity: "High",
    system: "Regression Suite",
    alert: "A new feature works, but an old working flow is now broken.",
    task: "Choose the action that protects existing functionality.",
    scenario: "A new feature works, but an old working flow is now broken.",
    choices: [
      "Test only the new feature",
      "Run regression suite, compare previous expected behavior, and isolate failed module",
      "Ignore old flow",
      "Deploy anyway",
    ],
    correctAnswer: 1,
    explanation:
      "Renish would use regression testing to protect existing functionality during new releases.",
    unlocks: ["Regression Testing", "Automation Framework"],
    achievement: "regression-shield",
  },
  {
    id: "logic-bug",
    title: "Business Rule Calculation Defect",
    shortLabel: "Logic Bug",
    position: [0, 0, -24],
    color: "#facc15",
    severity: "Critical",
    system: "Finance Logic",
    alert: "Budget total becomes incorrect when expenses, goals, and safe-spend values update together.",
    task: "Choose the action that proves the calculation rule.",
    scenario: "Budget total becomes incorrect when expenses, goals, and safe-spend values update together.",
    choices: [
      "Validate only UI display",
      "Validate business rules, edge cases, calculation logic, and database state",
      "Remove the goal feature",
      "Test only happy path",
    ],
    correctAnswer: 1,
    explanation:
      "Renish would test the real business rules behind the feature, not just the UI.",
    unlocks: ["Business Logic Testing", "Product Quality Thinking"],
    achievement: "logic-master",
  },
] as const;

export const missionZones = [
  {
    id: "mission-control",
    title: "Mission Control Spawn Area",
    position: [0, 0, 7],
    color: "#67e8f9",
  },
  {
    id: "project-evidence",
    title: "Project Evidence Room",
    position: [15, 0, 4],
    color: "#a78bfa",
  },
  {
    id: "skill-tower",
    title: "Skill Unlock Tower",
    position: [-15, 0, -20],
    color: "#bef264",
  },
  {
    id: "resume-vault",
    title: "Resume Vault",
    position: [15, 0, -26],
    color: "#facc15",
  },
  {
    id: "contact-station",
    title: "Contact Station",
    position: [-15, 0, 5],
    color: "#38bdf8",
  },
] as const;

export const bugTypes = [
  {
    id: "api",
    name: "API Bug",
    label: "API Bug Caught",
    position: [-12, 0.8, -10],
    detail: "Renish validates status codes, payloads, negative cases, authentication, and database impact.",
  },
  {
    id: "database",
    name: "Database Bug",
    label: "Database Bug Caught",
    position: [-6, 0.8, -15],
    detail: "Renish checks data integrity, relationships, persisted values, and database state after actions.",
  },
  {
    id: "auth",
    name: "Auth Bug",
    label: "Auth Bug Caught",
    position: [0, 0.8, -12],
    detail: "Renish tests sessions, protected routes, roles, permissions, and secure error behavior.",
  },
  {
    id: "ui",
    name: "UI Bug",
    label: "UI Bug Caught",
    position: [7, 0.8, -15],
    detail: "Renish reproduces user-facing issues, captures evidence, and validates important browser flows.",
  },
  {
    id: "regression",
    name: "Regression Bug",
    label: "Regression Bug Caught",
    position: [13, 0.8, -9],
    detail: "Renish protects old working flows with repeatable smoke and regression checks.",
  },
  {
    id: "logic",
    name: "Business Logic Bug",
    label: "Business Logic Bug Caught",
    position: [10, 0.8, -2],
    detail: "Renish maps requirements into edge cases, calculations, boundaries, and backend rule validation.",
  },
  {
    id: "performance",
    name: "Performance Bug",
    label: "Performance Bug Caught",
    position: [-10, 0.8, -2],
    detail: "Renish measures slow responses, reports bottlenecks clearly, and verifies behavior after optimization.",
  },
  {
    id: "validation",
    name: "Validation Bug",
    label: "Validation Bug Caught",
    position: [2, 0.8, -19],
    detail: "Renish tests invalid inputs, boundary values, required fields, and helpful validation errors.",
  },
] as const;

export const zones = [
  {
    id: "mission-control",
    title: "Mission Control Base",
    position: [0, 0, 8],
    color: "#67e8f9",
    prompt:
      "Welcome to Renish Mission Control. Production release is pending. Drive around, catch bugs, and discover the QA engineer behind the mission.",
  },
  {
    id: "qa-lab",
    title: "QA Lab",
    position: [-16, 0, 2],
    color: "#34d399",
  },
  {
    id: "bug-arena",
    title: "Bug Battle Arena",
    position: [0, 0, -14],
    color: "#fb7185",
  },
  {
    id: "project-garage",
    title: "Project Garage",
    position: [17, 0, 2],
    color: "#a78bfa",
  },
  {
    id: "skill-tower",
    title: "Skill Tower",
    position: [-15, 0, -17],
    color: "#bef264",
  },
  {
    id: "resume-vault",
    title: "Resume Vault",
    position: [15, 0, -17],
    color: "#facc15",
  },
  {
    id: "contact-station",
    title: "Contact Station",
    position: [0, 0, -26],
    color: "#38bdf8",
  },
] as const;

export const achievements = [
  { id: "first-bug-fixed", title: "First Bug Fixed" },
  { id: "api-guardian", title: "API Guardian" },
  { id: "database-defender", title: "Database Defender" },
  { id: "auth-protector", title: "Auth Protector" },
  { id: "regression-shield", title: "Regression Shield" },
  { id: "logic-master", title: "Logic Master" },
  { id: "resume-vault", title: "Resume Vault Unlocked" },
  { id: "release-ready", title: "Release Ready" },
  { id: "recruiter-mode", title: "Recruiter Mode Activated" },
];

export const contactLinks = {
  email: `mailto:${profile.email}`,
  linkedin: profile.linkedin,
  github: profile.github,
  resume: profile.resumeUrl,
};
