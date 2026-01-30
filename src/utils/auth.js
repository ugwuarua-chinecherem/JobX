// Authentication utility functions
export const auth = {
  // Check if user is logged in
  isLoggedIn: () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('jobx_isLoggedIn') === 'true';
  },

  // Get current user
  getUser: () => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('jobx_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Login user - FIXED to use password
  login: (email, password) => {
    const storedUser = auth.getUser();
    
    if (!storedUser) {
      return { success: false, message: 'No account found. Please register first.' };
    }

    if (storedUser.email !== email) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Check password
    if (storedUser.password !== password) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Login successful
    localStorage.setItem('jobx_isLoggedIn', 'true');
    return { success: true, user: storedUser };
  },

  // Register user - UPDATED to store password
  register: (userData) => {
    const user = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      state: userData.state,
      password: userData.password, // Store password
      registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('jobx_user', JSON.stringify(user));
    localStorage.setItem('jobx_isLoggedIn', 'true');
    return user;
  },

  // Logout user
  logout: () => {
    localStorage.setItem('jobx_isLoggedIn', 'false');
    // Keep user data for login later
  },

  // Get user's enrollments
  getEnrollments: () => {
    if (typeof window === 'undefined') return [];
    const enrollmentsStr = localStorage.getItem('jobx_enrollments');
    return enrollmentsStr ? JSON.parse(enrollmentsStr) : [];
  },

  // Enroll in course
  enrollCourse: (courseId, courseTitle) => {
    const user = auth.getUser();
    if (!user) return false;

    const enrollments = auth.getEnrollments();
    
    const alreadyEnrolled = enrollments.some(
      e => e.userId === user.id && e.courseId === courseId
    );
    
    if (alreadyEnrolled) return false;

    enrollments.push({
      userId: user.id,
      courseId,
      courseTitle,
      enrolledAt: new Date().toISOString(),
      completed: false
    });
    
    localStorage.setItem('jobx_enrollments', JSON.stringify(enrollments));
    return true;
  },

  // Check if enrolled in course
  isEnrolled: (courseId) => {
    const user = auth.getUser();
    if (!user) return false;

    const enrollments = auth.getEnrollments();
    return enrollments.some(
      e => e.userId === user.id && e.courseId === courseId
    );
  },

  // Mark course as completed
  completeCourse: (courseId) => {
    const user = auth.getUser();
    if (!user) return false;

    const enrollments = auth.getEnrollments();
    const enrollment = enrollments.find(
      e => e.userId === user.id && e.courseId === courseId
    );

    if (enrollment) {
      enrollment.completed = true;
      enrollment.completedAt = new Date().toISOString();
      localStorage.setItem('jobx_enrollments', JSON.stringify(enrollments));
      return true;
    }
    return false;
  },

  // Get user's applications
  getApplications: () => {
    if (typeof window === 'undefined') return [];
    const applicationsStr = localStorage.getItem('jobx_applications');
    return applicationsStr ? JSON.parse(applicationsStr) : [];
  },

  // Apply for job
  applyForJob: (jobId, jobTitle, company) => {
    const user = auth.getUser();
    if (!user) return false;

    const applications = auth.getApplications();
    
    const alreadyApplied = applications.some(
      a => a.userId === user.id && a.jobId === jobId
    );
    
    if (alreadyApplied) return false;

    applications.push({
      userId: user.id,
      jobId,
      jobTitle,
      company,
      appliedAt: new Date().toISOString(),
      status: 'pending'
    });
    
    localStorage.setItem('jobx_applications', JSON.stringify(applications));
    return true;
  },

  // Check if applied to job
  hasApplied: (jobId) => {
    const user = auth.getUser();
    if (!user) return false;

    const applications = auth.getApplications();
    return applications.some(
      a => a.userId === user.id && a.jobId === jobId
    );
  }
};