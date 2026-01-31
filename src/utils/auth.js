// Multi-user authentication system with localStorage
const AUTH_STORAGE_KEY = 'jobx_users';
const CURRENT_USER_KEY = 'jobx_current_user';
const ENROLLMENTS_KEY = 'jobx_enrollments';
const APPLICATIONS_KEY = 'jobx_applications';

export const auth = {
  // Get all registered users
  getAllUsers() {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem(AUTH_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  },

  // Save all users to localStorage
  saveAllUsers(users) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
  },

  // Register a new user
  register(userData) {
    const users = this.getAllUsers();
    
    // Check if email already exists
    const emailExists = users.find(user => user.email === userData.email);
    if (emailExists) {
      return { success: false, message: 'Email already registered' };
    }

    // Create new user object
    const newUser = {
      id: Date.now().toString(), // Unique ID based on timestamp
      name: userData.name,
      email: userData.email,
      password: userData.password, // In production, this should be hashed
      phone: userData.phone || '',
      state: userData.state || '',
      registeredAt: new Date().toISOString(),
      appliedJobs: [],
      enrolledCourses: []
    };

    // Add to users array
    users.push(newUser);
    this.saveAllUsers(users);

    return { success: true, message: 'Registration successful', user: newUser };
  },

  // Login user
  login(email, password) {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Save current user (without password for security)
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, message: 'Invalid email or password' };
  },

  // Logout user
  logout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Check if user is logged in
  isLoggedIn() {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(CURRENT_USER_KEY) !== null;
  },

  // Get current logged in user
  getUser() {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Update user profile
  updateUser(updatedData) {
    const currentUser = this.getUser();
    if (!currentUser) return { success: false, message: 'No user logged in' };

    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    // Update user data
    users[userIndex] = { ...users[userIndex], ...updatedData };
    this.saveAllUsers(users);

    // Update current user in session
    const updatedUser = { ...users[userIndex] };
    delete updatedUser.password;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    return { success: true, user: updatedUser };
  },

  // ============ JOB APPLICATION FUNCTIONS ============

  // Get all applications from localStorage
  getApplications() {
    if (typeof window === 'undefined') return [];
    const applications = localStorage.getItem(APPLICATIONS_KEY);
    return applications ? JSON.parse(applications) : [];
  },

  // Save all applications to localStorage
  saveApplications(applications) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
  },

  // Apply for a job
  applyForJob(jobId, jobTitle, company) {
    const currentUser = this.getUser();
    if (!currentUser) return false;

    const applications = this.getApplications();

    // Check if already applied
    const alreadyApplied = applications.some(
      a => a.userId === currentUser.id && a.jobId === jobId
    );
    if (alreadyApplied) return false;

    // Create new application
    const newApplication = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      jobId,
      jobTitle,
      company,
      appliedAt: new Date().toISOString(),
      status: 'pending'
    };

    applications.push(newApplication);
    this.saveApplications(applications);

    // Also update user's applied jobs
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
      if (!users[userIndex].appliedJobs) {
        users[userIndex].appliedJobs = [];
      }
      users[userIndex].appliedJobs.push({
        jobId,
        jobTitle,
        company,
        appliedAt: new Date().toISOString()
      });
      this.saveAllUsers(users);

      // Update session
      const updatedUser = { ...users[userIndex] };
      delete updatedUser.password;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }

    return true;
  },

  // Check if user has applied to a job
  hasApplied(jobId) {
    const currentUser = this.getUser();
    if (!currentUser) return false;

    const applications = this.getApplications();
    return applications.some(
      a => a.userId === currentUser.id && a.jobId === jobId
    );
  },

  // Get user's applied jobs
  getAppliedJobs() {
    const currentUser = this.getUser();
    if (!currentUser) return [];

    const applications = this.getApplications();
    return applications.filter(a => a.userId === currentUser.id);
  },

  // Get application details
  getApplicationDetails(jobId) {
    const currentUser = this.getUser();
    if (!currentUser) return null;

    const applications = this.getApplications();
    return applications.find(
      a => a.userId === currentUser.id && a.jobId === jobId
    ) || null;
  },

  // ============ COURSE ENROLLMENT FUNCTIONS ============

  // Get all enrollments from localStorage
  getEnrollments() {
    if (typeof window === 'undefined') return [];
    const enrollments = localStorage.getItem(ENROLLMENTS_KEY);
    return enrollments ? JSON.parse(enrollments) : [];
  },

  // Save all enrollments to localStorage
  saveEnrollments(enrollments) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(enrollments));
  },

  // Enroll in a course
  enrollInCourse(courseId, courseTitle, courseDescription) {
    const currentUser = this.getUser();
    if (!currentUser) return false;

    const enrollments = this.getEnrollments();

    // Check if already enrolled
    const alreadyEnrolled = enrollments.some(
      e => e.userId === currentUser.id && e.courseId === courseId
    );
    if (alreadyEnrolled) return false;

    // Create new enrollment
    const newEnrollment = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      courseId,
      courseTitle,
      courseDescription,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      completed: false
    };

    enrollments.push(newEnrollment);
    this.saveEnrollments(enrollments);

    // Also update user's enrolled courses
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
      if (!users[userIndex].enrolledCourses) {
        users[userIndex].enrolledCourses = [];
      }
      users[userIndex].enrolledCourses.push({
        courseId,
        courseTitle,
        enrolledAt: new Date().toISOString()
      });
      this.saveAllUsers(users);

      // Update session
      const updatedUser = { ...users[userIndex] };
      delete updatedUser.password;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }

    return true;
  },

  // Check if user is enrolled in a course
  isEnrolled(courseId) {
    const currentUser = this.getUser();
    if (!currentUser) return false;

    const enrollments = this.getEnrollments();
    return enrollments.some(
      e => e.userId === currentUser.id && e.courseId === courseId
    );
  },

  // Get user's enrolled courses
  getUserEnrollments() {
    const currentUser = this.getUser();
    if (!currentUser) return [];

    const enrollments = this.getEnrollments();
    return enrollments.filter(e => e.userId === currentUser.id);
  },

  // Update course progress
  updateCourseProgress(courseId, progress) {
    const currentUser = this.getUser();
    if (!currentUser) return false;

    const enrollments = this.getEnrollments();
    const enrollmentIndex = enrollments.findIndex(
      e => e.userId === currentUser.id && e.courseId === courseId
    );

    if (enrollmentIndex === -1) return false;

    enrollments[enrollmentIndex].progress = progress;
    if (progress >= 100) {
      enrollments[enrollmentIndex].completed = true;
      enrollments[enrollmentIndex].completedAt = new Date().toISOString();
    }

    this.saveEnrollments(enrollments);
    return true;
  },

  // Mark course as completed
  completeCourse(courseId) {
    const currentUser = this.getUser();
    if (!currentUser) return false;

    const enrollments = this.getEnrollments();
    const enrollmentIndex = enrollments.findIndex(
      e => e.userId === currentUser.id && e.courseId === courseId
    );

    if (enrollmentIndex === -1) return false;

    enrollments[enrollmentIndex].completed = true;
    enrollments[enrollmentIndex].completedAt = new Date().toISOString();
    enrollments[enrollmentIndex].progress = 100;

    this.saveEnrollments(enrollments);
    return true;
  },

  // Get enrollment details for a specific course
  getEnrollmentDetails(courseId) {
    const currentUser = this.getUser();
    if (!currentUser) return null;

    const enrollments = this.getEnrollments();
    return enrollments.find(
      e => e.userId === currentUser.id && e.courseId === courseId
    ) || null;
  },

  // Unenroll from a course (optional)
  unenrollFromCourse(courseId) {
    const currentUser = this.getUser();
    if (!currentUser) return false;

    const enrollments = this.getEnrollments();
    const updatedEnrollments = enrollments.filter(
      e => !(e.userId === currentUser.id && e.courseId === courseId)
    );

    this.saveEnrollments(updatedEnrollments);

    // Also remove from user's enrolled courses
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1 && users[userIndex].enrolledCourses) {
      users[userIndex].enrolledCourses = users[userIndex].enrolledCourses.filter(
        c => c.courseId !== courseId
      );
      this.saveAllUsers(users);

      // Update session
      const updatedUser = { ...users[userIndex] };
      delete updatedUser.password;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }

    return true;
  }
};