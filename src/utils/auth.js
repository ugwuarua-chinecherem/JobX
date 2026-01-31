// Multi-user authentication system with localStorage
const AUTH_STORAGE_KEY = 'jobx_users';
const CURRENT_USER_KEY = 'jobx_current_user';

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
      appliedJobs: []
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

  // Apply for a job
  applyForJob(jobId, jobTitle, company) {
    const currentUser = this.getUser();
    if (!currentUser) return false;

    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex === -1) return false;

    // Check if already applied
    const alreadyApplied = users[userIndex].appliedJobs.some(job => job.jobId === jobId);
    if (alreadyApplied) return false;

    // Add job to applied jobs
    users[userIndex].appliedJobs.push({
      jobId,
      jobTitle,
      company,
      appliedAt: new Date().toISOString()
    });

    this.saveAllUsers(users);

    // Update current user session
    const updatedUser = { ...users[userIndex] };
    delete updatedUser.password;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    return true;
  },

  // Check if user has applied to a job
  hasApplied(jobId) {
    const currentUser = this.getUser();
    if (!currentUser) return false;
    return currentUser.appliedJobs?.some(job => job.jobId === jobId) || false;
  },

  // Get user's applied jobs
  getAppliedJobs() {
    const currentUser = this.getUser();
    return currentUser?.appliedJobs || [];
  }
};