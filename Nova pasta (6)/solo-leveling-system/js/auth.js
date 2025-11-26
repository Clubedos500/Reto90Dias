/**
 * Authentication Logic
 */

const Auth = {
    mode: 'login',

    init: () => {
        // Bind Form Submit
        const form = document.getElementById('auth-form');
        if (form) {
            form.addEventListener('submit', Auth.handleSubmit);
        }

        // Bind Google Button
        const googleBtn = document.getElementById('btn-google');
        if (googleBtn) {
            googleBtn.addEventListener('click', Auth.handleGoogleLogin);
        }



        // Bind Tabs
        const tabLogin = document.getElementById('tab-login');
        if (tabLogin) tabLogin.addEventListener('click', () => Auth.switchMode('login'));

        const tabRegister = document.getElementById('tab-register');
        if (tabRegister) tabRegister.addEventListener('click', () => Auth.switchMode('register'));

        // Check auth state
        if (typeof auth !== 'undefined' && auth) {
            auth.onAuthStateChanged(user => {
                if (user) {
                    window.location.href = 'index.html';
                }
            });
        }
    },

    switchMode: (mode) => {
        Auth.mode = mode;
        const confirmGroup = document.getElementById('group-confirm');
        const btnSubmit = document.getElementById('btn-submit');
        const tabLogin = document.getElementById('tab-login');
        const tabRegister = document.getElementById('tab-register');

        if (mode === 'register') {
            confirmGroup.classList.remove('hidden');
            btnSubmit.textContent = "INITIATE PLAYER";
            tabLogin.classList.remove('active');
            tabRegister.classList.add('active');
            document.getElementById('confirm-password').required = true;
        } else {
            confirmGroup.classList.add('hidden');
            btnSubmit.textContent = "ENTER SYSTEM";
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            document.getElementById('confirm-password').required = false;
        }
    },

    handleSubmit: async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            if (Auth.mode === 'login') {
                await auth.signInWithEmailAndPassword(email, password);
            } else {
                const confirm = document.getElementById('confirm-password').value;
                if (password !== confirm) {
                    throw new Error("Passwords do not match.");
                }
                await auth.createUserWithEmailAndPassword(email, password);
            }
        } catch (error) {
            Auth.showError(error.message);
        }
    },

    handleGoogleLogin: async () => {
        if (!auth) {
            Auth.showError("Firebase not configured. Check console.");
            return;
        }
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await auth.signInWithPopup(provider);
        } catch (error) {
            Auth.showError(error.message);
        }
    },

    showError: (msg) => {
        const el = document.getElementById('error-message');
        el.textContent = `ERROR: ${msg}`;
        el.style.display = 'block';
    },

    logout: () => {
        if (auth) {
            auth.signOut().then(() => {
                window.location.href = 'login.html';
            });
        } else {
            window.location.href = 'login.html';
        }
    }
};

document.addEventListener('DOMContentLoaded', Auth.init);
