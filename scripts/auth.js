const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');

// Toggle Password Visibility
if (togglePassword && passwordInput) {
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
  });
}

// Login Logic
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.querySelector('input[name="login-role"]:checked').value;

    // Admin check
    if (role === 'admin') {
      if (username === 'admin' && password === 'admin123') {
        const adminUser = {
          name: 'Admin User',
          username: 'admin',
          role: 'admin'
        };
        localStorage.setItem('visionix_user', JSON.stringify(adminUser));
        window.location.href = 'admin.html';
      } else {
        alert('Invalid admin credentials');
      }
      return;
    }

    // Regular user check
    const users = JSON.parse(localStorage.getItem('visionix_users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('visionix_user', JSON.stringify({
        ...user,
        role: 'user'
      }));
      window.location.href = 'index.html';
    } else {
      alert('Invalid username or password');
    }
  });
}

// Register Logic
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('visionix_users')) || [];
    const id = "VXN-U" + String(users.length + 1).padStart(3, "0");
    if (users.find(u => u.username === name)) {
      alert('Username already exists');
      return;
    }

    const newUser = {
      id,
      name,
      username: name,
      email,
      password,
      registeredAt: new Date().toLocaleString()
    };
    users.push(newUser);
    localStorage.setItem('visionix_users', JSON.stringify(users));

    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
  });
}