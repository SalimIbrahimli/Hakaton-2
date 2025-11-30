
const USERS_KEY = "travelxUsers";
const CURRENT_USER_KEY = "travelxCurrentUser";


function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function getCurrentUser() {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}


function updateNavUserState() {
  const loginLink = document.getElementById("loginLink");
  if (!loginLink) return;

  const user = getCurrentUser();

  if (!user) {
  
    loginLink.textContent = "GiriÅŸ";
    loginLink.href = "./login.html";
    loginLink.onclick = null;
  } else {
    
    loginLink.textContent = user.name + " â€¢ Ã‡Ä±xÄ±ÅŸ";
    loginLink.href = "#";
    loginLink.onclick = (e) => {
      e.preventDefault();
      logoutUser();
      
      window.location.reload();
    };
  }
}


function requireAuth(redirectToLogin = true) {
  const user = getCurrentUser();
  if (!user && redirectToLogin) {
    window.location.href = "./login.html";
    return null;
  }
  return user;
}


document.addEventListener("DOMContentLoaded", () => {

  updateNavUserState();

 
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("fullName");
      const emailInput = document.getElementById("regEmail");
      const passInput = document.getElementById("regPassword");

      const errorBox = document.getElementById("registerError");
      const successBox = document.getElementById("registerSuccess");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim().toLowerCase();
      const password = passInput.value.trim();

  
      if (!name || !email || !password) {
        if (errorBox) {
          errorBox.textContent = "BÃ¼tÃ¼n xanalarÄ± doldurun.";
          errorBox.style.display = "block";
        }
        if (successBox) successBox.style.display = "none";
        return;
      }

      if (password.length < 6) {
        if (errorBox) {
          errorBox.textContent = "ÅžifrÉ™ É™n az 6 simvol olsun.";
          errorBox.style.display = "block";
        }
        if (successBox) successBox.style.display = "none";
        return;
      }

      const users = getUsers();
      const exists = users.some((u) => u.email === email);

      if (exists) {
        if (errorBox) {
          errorBox.textContent = "Bu e-poÃ§t ilÉ™ artÄ±q qeydiyyat var.";
          errorBox.style.display = "block";
        }
        if (successBox) successBox.style.display = "none";
        return;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password, 
      };

      users.push(newUser);
      saveUsers(users);
      setCurrentUser({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });

      if (errorBox) errorBox.style.display = "none";
      if (successBox) {
        successBox.textContent = "Qeydiyyat uÄŸurludur! YÃ¶nlÉ™ndirilirsiniz...";
        successBox.style.display = "block";
      }

      setTimeout(() => {
        window.location.href = "./welcome.html";
      }, 800);
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = document.getElementById("loginEmail");
      const passInput = document.getElementById("loginPassword");

      const errorBox = document.getElementById("loginError");
      const successBox = document.getElementById("loginSuccess");

      const email = emailInput.value.trim().toLowerCase();
      const password = passInput.value.trim();

      const users = getUsers();
      const found = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!found) {
        if (errorBox) {
          errorBox.textContent = "E-poÃ§t vÉ™ ya ÅŸifrÉ™ yanlÄ±ÅŸdÄ±r.";
          errorBox.style.display = "block";
        }
        if (successBox) successBox.style.display = "none";
        return;
      }

      setCurrentUser({ id: found.id, name: found.name, email: found.email });

      if (errorBox) errorBox.style.display = "none";
      if (successBox) {
        successBox.textContent = "UÄŸurla daxil oldunuz!";
        successBox.style.display = "block";
      }

      setTimeout(() => {
        window.location.href = "./welcome.html";
      }, 700);
    });
  }

  const welcomeNameEl = document.getElementById("welcomeName");
  if (welcomeNameEl) {
    const user = requireAuth(true); // login deyilsÉ™ loginÉ™ at
    if (user) {
      welcomeNameEl.textContent = user.name + "!";
    }
  }
});


