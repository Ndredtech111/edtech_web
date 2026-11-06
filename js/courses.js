/* =========================================================
   NDR EdTech — Course Data & Rendering
   Single source of truth for every course shown across the
   site (home page highlights, courses.html catalog, and
   course-details.html). Update course info here only.
   ========================================================= */

/* Category filter definitions: value must match course.category */
const courseCategories = [
  { label: "All", value: "All" },
  { label: "Data Engineering", value: "Data Engineering" },
  { label: "Cloud & DevOps", value: "Cloud & DevOps" },
  { label: "Programming", value: "Programming" },
  { label: "Testing", value: "Testing" },
  { label: "Data & BI", value: "Data & BI" },
  { label: "Database", value: "Database" },
  { label: "Cyber Security", value: "Cyber Security" },
  { label: "Business", value: "Business" },
  { label: "ERP", value: "ERP" }
];

/* Thin-line icons for the category filter chips (24x24, stroke) */
const categoryIcons = {
  "All": '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  "Data Engineering": '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  "Cloud & DevOps": '<path d="M7 18a4 4 0 01-.5-7.97A5.5 5.5 0 0117 8.5 4.5 4.5 0 0117.5 18H7z"/>',
  "Programming": '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
  "Testing": '<path d="M9 3h6M10 3v6l-5 9a2 2 0 001.8 3h10.4a2 2 0 001.8-3l-5-9V3"/><path d="M8 15h8"/>',
  "Data & BI": '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  "Database": '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  "Cyber Security": '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
  "Business": '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/>',
  "ERP": '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>'
};

/**
 * Each course:
 *  id           - url-safe slug, used in course-details.html?course=<id>
 *  name         - display name
 *  category     - must match a value in courseCategories
 *  level        - skill level shown on card
 *  description  - short card description
 *  image        - path under assets/courses/ (client to supply real photo)
 *  demoUrl      - YouTube URL. Leave "" until a real video is available —
 *                 the "Watch Demo" button is hidden automatically when empty.
 *  featured     - true surfaces the course in home page highlights
 * Optional rich fields (topics, curriculum, tools, projects, whoShouldJoin,
 * prerequisites, faqs) power course-details.html. When omitted, sensible
 * generic content is generated automatically — see js/course-details.js.
 */
const courses = [
  {
    id: "snowflake",
    name: "Snowflake",
    category: "Data Engineering",
    level: "Beginner to Advanced",
    description: "Master Snowflake architecture, SQL, data loading, Snowpipe, performance optimization and real-world data engineering concepts.",
    image: "assets/courses/snowflake.png",
    demoUrl: "https://youtu.be/hlKd_DGSXNo",
    featured: true,
    topics: [
      "Snowflake Architecture", "Cloud Concepts", "Virtual Warehouses", "Databases",
      "Schemas", "Stages", "File Formats", "Data Loading", "COPY INTO", "Snowpipe",
      "SQL", "Time Travel", "Zero-Copy Cloning", "Streams", "Tasks", "Dynamic Tables",
      "RBAC", "Security", "Performance Optimization", "Query Tuning", "Data Sharing",
      "External Tables", "API Integrations", "Real-Time Data Engineering Projects"
    ],
    curriculum: [
      "Cloud Data Warehousing & Snowflake Architecture", "Virtual Warehouses & Compute Management",
      "Databases, Schemas, Stages & File Formats", "Data Loading, COPY INTO & Snowpipe",
      "Snowflake SQL, Views & Time Travel", "Zero-Copy Cloning, Streams, Tasks & Dynamic Tables",
      "Security, RBAC & Governance", "Performance Optimization & Query Tuning",
      "Data Sharing, External Tables & API Integrations", "Real-Time Data Engineering Capstone Project"
    ],
    tools: ["Snowflake", "SnowSQL", "Snowpipe", "Cloud Storage (S3 / Azure Blob / GCS)", "SQL", "Git"],
    projects: [
      "End-to-end cloud data warehouse build for a retail analytics use case",
      "Automated data ingestion pipeline using Snowpipe and external stages",
      "Performance tuning project analyzing query plans on large datasets"
    ],
    prerequisites: "Basic understanding of SQL and databases is helpful but not mandatory — core concepts are covered from scratch.",
    faqs: [
      { q: "Do I need prior cloud experience for Snowflake?", a: "No. We start with cloud and data warehousing fundamentals before moving into Snowflake-specific concepts." },
      { q: "Will this course cover real projects?", a: "Yes, the course includes hands-on labs and real-time data engineering projects throughout." }
    ]
  },
  {
    id: "azure-data-factory",
    name: "Azure Data Factory",
    category: "Data Engineering",
    level: "Beginner to Advanced",
    description: "Build robust cloud ETL/ELT pipelines using Azure Data Factory, integration runtimes, mapping data flows and orchestration.",
    image: "assets/courses/azuredatafactory.png",
    demoUrl: "",
    featured: true,
    topics: ["ADF Architecture", "Linked Services", "Datasets", "Pipelines", "Mapping Data Flows",
      "Integration Runtimes", "Triggers & Scheduling", "Data Lake Integration", "CI/CD for ADF", "Monitoring & Alerts"]
  },
  {
    id: "aws-devops",
    name: "AWS DevOps",
    category: "Cloud & DevOps",
    level: "Beginner to Advanced",
    description: "Learn AWS cloud infrastructure, CI/CD pipelines, containerization and automation for modern DevOps engineering roles.",
    image: "assets/courses/awsdevops.png",
    demoUrl: "",
    featured: true,
    topics: ["AWS Core Services", "IAM & Security", "EC2 & VPC", "CodePipeline & CodeBuild", "CloudFormation",
      "Docker & ECS", "Kubernetes on EKS", "Monitoring with CloudWatch", "Terraform Basics", "Real-Time CI/CD Projects"],
    tools: ["AWS", "Terraform", "Jenkins", "Docker", "Kubernetes", "Git", "CloudWatch"]
  },
  {
    id: "azure-devops",
    name: "Azure DevOps",
    category: "Cloud & DevOps",
    level: "Beginner to Advanced",
    description: "Implement end-to-end CI/CD pipelines, infrastructure automation and release management using Azure DevOps.",
    image: "assets/courses/azure-devops.png",
    demoUrl: "",
    featured: true,
    topics: ["Azure Boards", "Repos & Git", "Build Pipelines (CI)", "Release Pipelines (CD)", "Azure Artifacts",
      "ARM Templates & Bicep", "Containers on AKS", "Monitoring", "Security & Compliance", "Real-Time DevOps Projects"],
    tools: ["Azure DevOps", "Git", "Docker", "Kubernetes (AKS)", "ARM / Bicep", "Terraform"]
  },
  {
    id: "java",
    name: "Java",
    category: "Programming",
    level: "Beginner to Advanced",
    description: "Learn core and advanced Java, OOP concepts, collections, multithreading and enterprise application development.",
    image: "assets/courses/java.jpg",
    demoUrl: "",
    featured: true,
    topics: ["Core Java & OOP", "Collections Framework", "Exception Handling", "Multithreading", "File I/O",
      "JDBC", "Java 8+ Streams & Lambdas", "Spring Boot Basics", "REST APIs", "Real-Time Application Development"],
    tools: ["Java (JDK)", "IntelliJ IDEA / Eclipse", "Maven", "Spring Boot", "Git", "Postman"]
  },
  {
    id: "python",
    name: "Python",
    category: "Programming",
    level: "Beginner to Advanced",
    description: "Learn Python programming with practical examples covering core syntax, OOP, data handling and automation.",
    image: "assets/courses/python.jpg",
    demoUrl: "",
    featured: true,
    topics: ["Python Fundamentals", "Data Structures", "OOP in Python", "File Handling", "Exception Handling",
      "Modules & Packages", "Working with APIs", "Pandas & NumPy Basics", "Automation Scripting", "Real-Time Mini Projects"],
    tools: ["Python", "VS Code / PyCharm", "Pandas", "NumPy", "Git", "Jupyter Notebook"]
  },
  {
    id: "jira-administration",
    name: "JIRA Administration",
    category: "Business",
    level: "Beginner to Intermediate",
    description: "Learn to configure, administer and optimize JIRA for agile project management and issue tracking across teams.",
    image: "assets/courses/jira-administration.jpg",
    demoUrl: "",
    topics: ["JIRA Setup & Configuration", "Projects & Workflows", "Custom Fields & Screens", "Permission Schemes",
      "Agile Boards (Scrum/Kanban)", "JQL", "Automation Rules", "JIRA Service Management Basics"]
  },
  {
    id: "google-cloud-platform",
    name: "Google Cloud Platform",
    category: "Cloud & DevOps",
    level: "Beginner to Advanced",
    description: "Get hands-on with GCP core services, compute, storage, networking and cloud deployment fundamentals.",
    image: "assets/courses/google-cloud-platform.jpg",
    demoUrl: "",
    topics: ["GCP Fundamentals", "IAM & Security", "Compute Engine", "Cloud Storage", "VPC Networking",
      "GKE (Kubernetes)", "Cloud Functions", "BigQuery Basics", "Monitoring & Logging", "Real-Time Deployment Projects"]
  },
  {
    id: "cyber-security",
    name: "Cyber Security",
    category: "Cyber Security",
    level: "Beginner to Advanced",
    description: "Build strong foundations in security operations, threat detection, network security and ethical hacking concepts.",
    image: "assets/courses/cybersecurity.png",
    demoUrl: "",
    featured: true,
    topics: ["Security Fundamentals", "Network Security", "Threat & Vulnerability Management", "Security Operations (SOC)",
      "Ethical Hacking Basics", "Incident Response", "Identity & Access Management", "Cloud Security Basics", "Compliance & Governance", "Real-World Security Case Studies"],
    tools: ["SIEM Tools", "Wireshark", "Nmap", "Kali Linux", "IAM Platforms", "Firewalls"]
  },
  {
    id: "mulesoft",
    name: "MuleSoft",
    category: "Programming",
    level: "Intermediate to Advanced",
    description: "Learn API-led connectivity and integration development using MuleSoft Anypoint Platform.",
    image: "assets/courses/mulesoft.jpg",
    demoUrl: "",
    topics: ["Anypoint Studio", "API-Led Connectivity", "DataWeave", "RAML/API Design", "Connectors",
      "Error Handling", "API Manager", "CloudHub Deployment"]
  },
  {
    id: "tableau-administration",
    name: "Tableau Administration",
    category: "Data & BI",
    level: "Beginner to Advanced",
    description: "Learn Tableau Server/Cloud administration, site management, security and dashboard governance.",
    image: "assets/courses/tableau-administration.jpg",
    demoUrl: "",
    topics: ["Tableau Server Architecture", "Installation & Configuration", "Site & User Management",
      "Permissions & Security", "Data Sources & Extracts", "Performance Monitoring", "Publishing & Governance"]
  },
  {
    id: "vmware",
    name: "VMware",
    category: "Cloud & DevOps",
    level: "Beginner to Advanced",
    description: "Learn virtualization fundamentals, vSphere administration, ESXi and enterprise infrastructure management.",
    image: "assets/courses/vmware.jpg",
    demoUrl: "",
    topics: ["Virtualization Fundamentals", "ESXi Installation", "vCenter Server", "Virtual Networking",
      "Storage Management", "vMotion & HA/DRS", "Snapshots & Backups", "Monitoring & Troubleshooting"]
  },
  {
    id: "servicenow-administration",
    name: "ServiceNow Administration",
    category: "Business",
    level: "Beginner to Advanced",
    description: "Learn ServiceNow platform administration, ITSM modules, workflows and configuration management.",
    image: "assets/courses/servicenow-administration.jpg",
    demoUrl: "",
    topics: ["Platform Basics", "ITSM Modules", "Workflows & Business Rules", "ACLs & Security",
      "Reporting & Dashboards", "Integrations", "Change/Incident/Problem Management"]
  },
  {
    id: "tosca",
    name: "Tosca",
    category: "Testing",
    level: "Beginner to Advanced",
    description: "Learn model-based test automation using Tricentis Tosca for scalable, maintainable automated testing.",
    image: "assets/courses/tosca.jpg",
    demoUrl: "",
    topics: ["Tosca Fundamentals", "Modules & Test Cases", "Object Identification", "Test Case Design",
      "Data-Driven Testing", "Test Execution & Reporting", "Integration with CI/CD"]
  },
  {
    id: "selenium",
    name: "Selenium",
    category: "Testing",
    level: "Beginner to Advanced",
    description: "Master automated web testing using Selenium WebDriver with Java/Python, TestNG and framework design.",
    image: "assets/courses/selenium.jpg",
    demoUrl: "",
    featured: true,
    topics: ["Selenium WebDriver", "Locators & XPath", "TestNG/JUnit", "Page Object Model", "Data-Driven Framework",
      "Handling Waits & Alerts", "Cross-Browser Testing", "CI/CD Integration (Jenkins)", "Reporting", "Real-Time Automation Projects"],
    tools: ["Selenium WebDriver", "Java / Python", "TestNG", "Maven", "Jenkins", "Git"]
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    category: "Business",
    level: "Beginner to Advanced",
    description: "Learn SEO, SEM, social media marketing, content strategy and analytics for modern digital marketing careers.",
    image: "assets/courses/digital-marketing.jpg",
    demoUrl: "",
    topics: ["SEO Fundamentals", "Google Ads (SEM)", "Social Media Marketing", "Content Marketing",
      "Email Marketing", "Google Analytics", "Marketing Strategy & Campaigns"]
  },
  {
    id: "etl-testing",
    name: "ETL Testing",
    category: "Testing",
    level: "Beginner to Advanced",
    description: "Learn data warehouse testing concepts, ETL validation, SQL-based testing and data quality assurance.",
    image: "assets/courses/etl-testing.jpg",
    demoUrl: "",
    topics: ["ETL & DWH Concepts", "Test Planning & Strategy", "SQL for Testing", "Data Validation Techniques",
      "Source-to-Target Mapping", "Test Automation for ETL", "Defect Management"]
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "Cloud & DevOps",
    level: "Intermediate to Advanced",
    description: "Learn container orchestration with Kubernetes — deployments, services, scaling and cluster management.",
    image: "assets/courses/kubernetes.jpg",
    demoUrl: "",
    topics: ["Kubernetes Architecture", "Pods, Deployments & Services", "ConfigMaps & Secrets", "Namespaces",
      "Helm Charts", "Autoscaling", "Ingress & Networking", "Monitoring with Prometheus/Grafana", "CI/CD with Kubernetes", "Real-Time Cluster Projects"],
    tools: ["Kubernetes", "Docker", "Helm", "kubectl", "Prometheus", "Grafana"]
  },
  {
    id: "linux-administration",
    name: "Linux Administration",
    category: "Cloud & DevOps",
    level: "Beginner to Advanced",
    description: "Learn Linux system administration, shell scripting, networking and server management fundamentals.",
    image: "assets/courses/linux-administration.jpg",
    demoUrl: "",
    topics: ["Linux Fundamentals", "File System & Permissions", "User & Group Management", "Shell Scripting",
      "Package Management", "Networking Basics", "Process & Service Management", "Server Security Basics"]
  },
  {
    id: "power-bi",
    name: "Power BI",
    category: "Data & BI",
    level: "Beginner to Advanced",
    description: "Learn data visualization, DAX, data modeling and interactive dashboard design using Microsoft Power BI.",
    image: "assets/courses/powerbi.png",
    demoUrl: "",
    featured: true,
    topics: ["Power BI Desktop", "Data Modeling", "Power Query (ETL)", "DAX Fundamentals", "Advanced DAX",
      "Interactive Dashboards & Reports", "Power BI Service & Sharing", "Row-Level Security", "Real-Time BI Projects"],
    tools: ["Power BI Desktop", "Power BI Service", "DAX", "Power Query", "SQL", "Excel"]
  },
  {
    id: "sql-pl-sql",
    name: "SQL / PL SQL",
    category: "Database",
    level: "Beginner to Advanced",
    description: "Master SQL querying and PL/SQL programming for database development, procedures and performance tuning.",
    image: "assets/courses/sql-plsql.jpg",
    demoUrl: "",
    featured: true,
    topics: ["SQL Fundamentals", "Joins & Subqueries", "Aggregate Functions", "PL/SQL Blocks", "Cursors",
      "Stored Procedures & Functions", "Triggers", "Exception Handling", "Performance Tuning", "Real-Time Database Projects"],
    tools: ["Oracle SQL Developer", "PL/SQL", "MySQL Workbench", "TOAD", "Git"]
  },
  {
    id: "oracle-dba",
    name: "Oracle DBA",
    category: "Database",
    level: "Intermediate to Advanced",
    description: "Learn Oracle database administration — installation, backup/recovery, performance tuning and security.",
    image: "assets/courses/oracle-dba.jpg",
    demoUrl: "",
    topics: ["Oracle Architecture", "Installation & Configuration", "User & Security Management", "Backup & Recovery (RMAN)",
      "Performance Tuning", "Patching & Upgrades", "High Availability Concepts"]
  },
  {
    id: "informatica",
    name: "Informatica",
    category: "Data Engineering",
    level: "Beginner to Advanced",
    description: "Learn ETL development using Informatica PowerCenter for data integration and warehousing projects.",
    image: "assets/courses/informatica.png",
    demoUrl: "",
    topics: ["Informatica Architecture", "Mappings & Transformations", "Workflows & Sessions", "Data Quality Basics",
      "Performance Tuning", "Scheduling & Monitoring", "Real-Time ETL Projects"]
  },
  {
    id: "informatica-cloud",
    name: "Informatica Cloud",
    category: "Data Engineering",
    level: "Intermediate to Advanced",
    description: "Learn Informatica Intelligent Cloud Services (IICS) for cloud-based data integration and ETL pipelines.",
    image: "assets/courses/informaticacloud.png",
    demoUrl: "",
    topics: ["IICS Overview", "Cloud Mapping Designer", "Cloud Connectors", "Task Flows",
      "API & Application Integration", "Monitoring & Scheduling", "Cloud Data Warehousing Integration"]
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "Business",
    level: "Beginner to Advanced",
    description: "Learn Salesforce administration and configuration for CRM management, automation and reporting.",
    image: "assets/courses/salesforce.jpg",
    demoUrl: "",
    topics: ["Salesforce Fundamentals", "Objects & Fields", "Workflow & Process Automation", "Reports & Dashboards",
      "Security & Access Management", "Apex Basics", "Lightning App Builder", "Real-Time CRM Projects"],
    tools: ["Salesforce Platform", "Apex", "Lightning App Builder", "Data Loader", "SOQL"]
  },
  {
    id: "data-science",
    name: "Data Science",
    category: "Data & BI",
    level: "Beginner to Advanced",
    description: "Learn statistics, Python for data analysis, machine learning fundamentals and data visualization.",
    image: "assets/courses/data-science.jpg",
    demoUrl: "",
    featured: true,
    topics: ["Statistics & Probability", "Python for Data Science", "Data Wrangling with Pandas", "Data Visualization",
      "Exploratory Data Analysis", "Machine Learning Fundamentals", "Model Evaluation", "Real-World Case Studies"],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib/Seaborn", "Scikit-learn", "Jupyter Notebook"]
  },
  {
    id: "data-science-ai-ml",
    name: "Data Science with AI & ML",
    category: "Data & BI",
    level: "Intermediate to Advanced",
    description: "Advance into machine learning, deep learning fundamentals and AI-driven model building with real datasets.",
    image: "assets/courses/data-science-ai-ml.jpg",
    demoUrl: "",
    topics: ["Advanced Machine Learning", "Feature Engineering", "Deep Learning Basics", "Neural Networks",
      "NLP Fundamentals", "Model Deployment Basics", "MLOps Overview", "Real-Time AI/ML Projects"],
    tools: ["Python", "Scikit-learn", "TensorFlow/Keras", "Pandas", "NumPy", "Jupyter Notebook"]
  },
  {
    id: "docker",
    name: "Docker",
    category: "Cloud & DevOps",
    level: "Beginner to Advanced",
    description: "Learn containerization fundamentals with Docker — images, containers, networking and orchestration basics.",
    image: "assets/courses/docker.jpg",
    demoUrl: "",
    topics: ["Docker Fundamentals", "Images & Containers", "Dockerfile", "Docker Compose",
      "Networking & Volumes", "Docker Registry", "CI/CD Integration", "Intro to Container Orchestration"],
    tools: ["Docker", "Docker Compose", "Docker Hub", "Git", "Jenkins"]
  },
  {
    id: "dotnet",
    name: ".NET",
    category: "Programming",
    level: "Beginner to Advanced",
    description: "Learn C# and .NET framework/Core for building enterprise web applications and APIs.",
    image: "assets/courses/dotnet.jpg",
    demoUrl: "",
    topics: ["C# Fundamentals", "OOP Concepts", ".NET Core Basics", "ASP.NET MVC", "Entity Framework",
      "Web API Development", "Unit Testing", "Real-Time Application Development"]
  },
  {
    id: "oracle-fusion",
    name: "Oracle Fusion",
    category: "ERP",
    level: "Intermediate to Advanced",
    description: "Learn Oracle Fusion Cloud applications for finance, HCM or SCM modules and enterprise configuration.",
    image: "assets/courses/oracle-fusion.jpg",
    demoUrl: "",
    topics: ["Fusion Applications Overview", "Functional Setup Manager", "Core Module Configuration",
      "Security & Roles", "Reporting Tools (OTBI/BIP)", "Integrations Overview"]
  },
  {
    id: "pega-prpc",
    name: "Pega PRPC",
    category: "Business",
    level: "Intermediate to Advanced",
    description: "Learn Pega platform (PRPC) for building business process management and case management applications.",
    image: "assets/courses/pega-prpc.jpg",
    demoUrl: "",
    topics: ["Pega Platform Basics", "Case Management", "Data Modeling", "Process Flows & Rules",
      "UI Development", "Integration Basics", "Security Model"]
  },
  {
    id: "business-analyst",
    name: "Business Analyst",
    category: "Business",
    level: "Beginner to Advanced",
    description: "Learn requirement gathering, documentation, stakeholder management and business analysis techniques.",
    image: "assets/courses/business-analyst.jpg",
    demoUrl: "",
    topics: ["BA Fundamentals", "Requirement Elicitation Techniques", "BRD/FRD Documentation", "Process Modeling (BPMN)",
      "Stakeholder Management", "Agile & Scrum for BAs", "Tools: JIRA & Confluence", "Real-World Case Studies"]
  },
  {
    id: "manual-testing",
    name: "Manual Testing",
    category: "Testing",
    level: "Beginner to Intermediate",
    description: "Learn software testing fundamentals, test case design, defect management and QA processes.",
    image: "assets/courses/manual-testing.jpg",
    demoUrl: "",
    topics: ["SDLC & STLC", "Test Case Design Techniques", "Test Planning & Strategy", "Defect Life Cycle",
      "Functional & Regression Testing", "Test Management Tools", "Real-World QA Projects"]
  },
  {
    id: "cyberark",
    name: "CyberArk",
    category: "Cyber Security",
    level: "Intermediate to Advanced",
    description: "Learn Privileged Access Management (PAM) implementation and administration using CyberArk.",
    image: "assets/courses/cyberark.jpg",
    demoUrl: "",
    topics: ["PAM Fundamentals", "CyberArk Architecture", "Vault Configuration", "Safes & Policies",
      "Password Management", "Session Monitoring", "Integrations & Security Best Practices"]
  },
  {
    id: "looker-bi",
    name: "Looker BI",
    category: "Data & BI",
    level: "Intermediate to Advanced",
    description: "Learn Looker for data modeling with LookML and building governed, scalable BI dashboards.",
    image: "assets/courses/looker-bi.jpg",
    demoUrl: "",
    topics: ["Looker Fundamentals", "LookML Basics", "Explores & Views", "Dashboards & Visualizations",
      "Data Modeling Best Practices", "Permissions & Governance"]
  },
  {
    id: "mis-executive",
    name: "MIS Executive",
    category: "Business",
    level: "Beginner to Intermediate",
    description: "Learn advanced Excel, reporting automation and MIS dashboard preparation for business reporting roles.",
    image: "assets/courses/mis-executive.jpg",
    demoUrl: "",
    topics: ["Advanced Excel Functions", "Pivot Tables & Charts", "Dashboard Design", "VBA/Macros Basics",
      "Data Cleaning Techniques", "Report Automation"]
  },
  {
    id: "investment-banking-nism",
    name: "Investment Banking / NISM",
    category: "Business",
    level: "Beginner to Advanced",
    description: "Learn core investment banking concepts, financial markets fundamentals and NISM certification preparation.",
    image: "assets/courses/investment-banking-nism.jpg",
    demoUrl: "",
    topics: ["Financial Markets Basics", "Investment Banking Concepts", "Equity & Derivatives Basics",
      "NISM Module Preparation", "Valuation Fundamentals", "Case Studies"]
  },
  {
    id: "change-management",
    name: "Change Management",
    category: "Business",
    level: "Beginner to Advanced",
    description: "Learn organizational change management frameworks, stakeholder engagement and adoption strategies.",
    image: "assets/courses/change-management.jpg",
    demoUrl: "",
    topics: ["Change Management Fundamentals", "Prosci ADKAR Framework", "Stakeholder Analysis",
      "Communication Planning", "Resistance Management", "Change Measurement & Sustainment"]
  }
];

/* ---------------------------------------------------------
   Rendering helpers (used by index.html and courses.html)
   --------------------------------------------------------- */

/** When a course has no image, show an animated concept scene for its category (see project-anim.js). */
const COURSE_SCENES = {
  "Data Engineering": ["Data Engineering", "#0E2A5E,#1677FF"],
  "Cloud & DevOps":   ["DevOps Automation", "#1677FF,#7C5CFC"],
  "Programming":      ["Software Development", "#071A41,#1677FF"],
  "Testing":          ["Testing Automation", "#123B76,#7C5CFC"],
  "Data & BI":        ["Business Intelligence", "#0E2A5E,#1677FF"],
  "Database":         ["Data Warehousing", "#0E2A5E,#21B8E6"],
  "Cyber Security":   ["Cyber Security", "#071A41,#21B8E6"],
  "Business":         ["ETL Pipelines", "#071A41,#7C5CFC"],
  "ERP":              ["Cloud Migration", "#123B76,#21B8E6"],
};
/* Per-course scene (keys are scene names from project-anim.js); falls back to the category scene */
const COURSE_SCENE_BY_ID = {
  "java": "Java Code", "python": "Python Code", "dotnet": "NET Code",
  "jira-administration": "Kanban", "google-cloud-platform": "Cloud Services", "mulesoft": "Integration",
  "tableau-administration": "Dashboard", "looker-bi": "Dashboard", "power-bi": "Dashboard",
  "vmware": "VMs", "servicenow-administration": "Workflow", "tosca": "Test Tree",
  "selenium": "Browser Test", "manual-testing": "Testing Automation", "etl-testing": "ETL Compare",
  "digital-marketing": "Marketing", "kubernetes": "Kubernetes", "linux-administration": "Terminal",
  "docker": "Containers", "sql-pl-sql": "Query", "oracle-dba": "DB Admin", "salesforce": "CRM",
  "data-science": "Scatter", "data-science-ai-ml": "Neural", "oracle-fusion": "ERP Modules",
  "pega-prpc": "Case Flow", "business-analyst": "Requirements", "cyberark": "Vault",
  "mis-executive": "Spreadsheet", "investment-banking-nism": "Candles", "change-management": "Change"
};
/** Scrolling strip of key concepts inside a course-detail hero box (works over photos and animated scenes). */
function addConceptStrip(host, topics, courseId) {
  if (!host || !host.classList.contains("cd-visual") || host.querySelector(".pa-marquee")) return;
  if (!topics || !topics.length) {
    const c = courses.find((x) => x.id === courseId);
    topics = c && c.topics ? c.topics : [];
  }
  topics = topics.slice(0, 8);
  if (!topics.length) return;
  const chips = topics.map((t) => '<span class="pa-chip">' + t + "</span>").join("");
  const m = document.createElement("div");
  m.className = "pa-marquee";
  m.innerHTML = '<div class="pa-track" style="animation-duration:' + topics.length * 5 + 's">' + chips + chips + "</div>";
  host.appendChild(m);
}
function courseThumbFallback(img) {
  const cfg = COURSE_SCENES[img.dataset.category] || COURSE_SCENES["Data Engineering"];
  const el = document.createElement("div");
  el.className = "project-thumb course-anim";
  el.style.background = "linear-gradient(135deg," + cfg[1] + ")";
  el.textContent = COURSE_SCENE_BY_ID[img.dataset.id] || cfg[0];
  img.replaceWith(el);
  if (window.paMount) window.paMount([el]);
  addConceptStrip(el.parentElement, null, img.dataset.id);
}

/** Builds the inner HTML for a single course card. */
function renderCourseCard(course) {
  const demoBtn = course.demoUrl
    ? `<button class="btn-play" type="button" data-demo-url="${encodeURIComponent(course.demoUrl)}" aria-label="Watch ${course.name} demo video">
         <span class="play-icon" aria-hidden="true">&#9654;</span> Watch Demo
       </button>`
    : "";

  const initials = course.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return `
    <article class="course-card reveal" data-category="${course.category}" data-name="${course.name.toLowerCase()}">
      <div class="course-thumb">
        <span class="thumb-category">${course.category}</span>
        <img class="lazy-img" src="${course.image}" alt="${course.name} training illustration" loading="lazy"
             onload="this.classList.add('loaded')"
             data-category="${course.category}" data-id="${course.id}" onerror="courseThumbFallback(this)">
      </div>
      <div class="course-body">
        <span class="course-cat">${course.category}</span>
        <h3>${course.name}</h3>
        <p class="course-desc">${course.description}</p>
        <ul class="course-features">
          <li>${course.level}</li>
          <li>Hands-on Training</li>
          <li>Real-Time Projects</li>
          <li>Interview Preparation</li>
        </ul>
        <div class="course-actions">
          <a class="btn btn-primary btn-sm" href="course-details.html?course=${course.id}">View Course</a>
          ${demoBtn}
        </div>
      </div>
    </article>`;
}

/** Renders a list of courses into a container element by id. */
function renderCourseGrid(containerId, list) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = list.map(renderCourseCard).join("");
  bindDemoButtons(el);
  if (window.observeReveal) window.observeReveal(el.querySelectorAll(".reveal"));
}

/** Extracts a YouTube video ID from a watch/short/embed URL. */
function getYoutubeVideoId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

let videoModalEls = null;
function ensureVideoModal() {
  if (videoModalEls) return videoModalEls;

  const modal = document.createElement("div");
  modal.className = "video-modal";
  modal.id = "videoModal";
  modal.innerHTML = `
    <div class="video-modal-backdrop" data-video-close></div>
    <div class="video-modal-panel" role="dialog" aria-modal="true">
      <button type="button" class="video-modal-close" data-video-close aria-label="Close video">&times;</button>
      <div class="video-modal-frame">
        <iframe id="videoModalIframe" src="" title="Course demo video" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const iframe = modal.querySelector("#videoModalIframe");
  function closeModal() {
    modal.classList.remove("open");
    iframe.src = "";
  }
  modal.querySelectorAll("[data-video-close]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  videoModalEls = { modal, iframe };
  return videoModalEls;
}

/** Opens a course's YouTube demo in an in-page modal when its button is clicked. */
function bindDemoButtons(scope) {
  (scope || document).querySelectorAll("[data-demo-url]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = decodeURIComponent(btn.getAttribute("data-demo-url"));
      const videoId = url && getYoutubeVideoId(url);
      if (!videoId) return;
      const { modal, iframe } = ensureVideoModal();
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      modal.classList.add("open");
    });
  });
}

/** Sets up category filter buttons + search box for a courses grid. */
function initCourseFilters(opts) {
  const { filterContainerId, gridId, searchInputId, emptyStateId, list } = opts;
  const filterEl = document.getElementById(filterContainerId);
  const grid = document.getElementById(gridId);
  const searchInput = searchInputId ? document.getElementById(searchInputId) : null;
  const emptyState = emptyStateId ? document.getElementById(emptyStateId) : null;
  if (!filterEl || !grid) return;

  filterEl.innerHTML = courseCategories
    .map((c, i) => `<button class="filter-btn${i === 0 ? " active" : ""}" data-filter="${c.value}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${(categoryIcons[c.value] || "").replace(/<(path|rect|circle|ellipse)/g, '<$1 pathLength="1"')}</svg><span>${c.label}</span></button>`)
    .join("");

  let activeFilter = "All";

  function applyFilter() {
    const term = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const filtered = list.filter((c) => {
      const matchesCategory = activeFilter === "All" || c.category === activeFilter;
      const matchesSearch = !term || c.name.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
    renderCourseGrid(gridId, filtered);
    if (emptyState) emptyState.classList.toggle("show", filtered.length === 0);
    const countEl = document.getElementById("resultsCount");
    if (countEl) countEl.textContent = `${filtered.length} course${filtered.length === 1 ? "" : "s"} found`;
  }

  filterEl.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      filterEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter");
      applyFilter();
    });
  });

  if (searchInput) searchInput.addEventListener("input", applyFilter);

  applyFilter();
}
