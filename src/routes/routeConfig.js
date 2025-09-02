// Route path constants
export const ROUTES = {
  // Public routes
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  CONTACT: "/contact",

  // Authentication routes
  LOGIN: "/login",
  SIGNUP: "/signup",

  // User routes
  PROFILE: "/profile",
  JOBS: "/jobs",
  JOB_DETAILS: "/jobs/:id",

  // Admin routes
  ADMIN: "/admin",
  POST_JOB: "/post-job",
  CREATE_JOB: "/create-job",
};

// Route metadata for navigation and access control
export const ROUTE_CONFIG = {
  [ROUTES.HOME]: {
    title: "Help Yourself - Find Your Dream Job in India",
    public: true,
    showInNav: true,
  },
  [ROUTES.ABOUT]: {
    title: "About Us - Help Yourself",
    public: true,
    showInNav: true,
  },
  [ROUTES.SERVICES]: {
    title: "Our Services - Help Yourself",
    public: true,
    showInNav: true,
  },
  [ROUTES.CONTACT]: {
    title: "Contact Us - Help Yourself",
    public: true,
    showInNav: true,
  },
  [ROUTES.LOGIN]: {
    title: "Login - Help Yourself",
    public: true,
    showInNav: false,
  },
  [ROUTES.SIGNUP]: {
    title: "Sign Up - Help Yourself",
    public: true,
    showInNav: false,
  },
  [ROUTES.PROFILE]: {
    title: "My Profile - Help Yourself",
    public: false,
    requiresAuth: true,
    showInNav: false,
  },
  [ROUTES.JOBS]: {
    title: "Browse Jobs in India - Help Yourself",
    public: false,
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.JOB_DETAILS]: {
    title: "Job Details - Help Yourself",
    public: false,
    requiresAuth: true,
    showInNav: false,
  },
  [ROUTES.ADMIN]: {
    title: "Admin Dashboard - Help Yourself",
    public: false,
    requiresAuth: true,
    requiresAdmin: true,
    showInNav: false,
  },
  [ROUTES.POST_JOB]: {
    title: "Post New Job - Help Yourself",
    public: false,
    requiresAuth: true,
    requiresAdmin: true,
    showInNav: false,
  },
  [ROUTES.CREATE_JOB]: {
    title: "Create Job Listing - Help Yourself",
    public: false,
    requiresAuth: true,
    requiresAdmin: true,
    showInNav: false,
  },
};
