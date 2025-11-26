
// --- Elementos do DOM ---
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const authForm = document.getElementById('auth-form');
const btnSubmit = document.getElementById('btn-submit');
const btnGoogle = document.getElementById('btn-google');
const errorMessage = document.getElementById('error-message');
const groupConfirm = document.getElementById('group-confirm');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputConfirmPassword = document.getElementById('confirm-password');

let isLoginMode = true; // Estado para controlar se estamos em Login ou Register

// --- Funções de Ajuda ---

/** Exibe a mensagem de erro no campo apropriado. */
function displayError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';
        }, 5000); // Esconde a mensagem após 5 segundos
    } else {
        alert(message);
    }
}

/** Limpa a mensagem de erro. */
function clearError() {
    if (errorMessage) {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }
}

// --- Lógica de Alternância de Abas (LOGIN / REGISTER) ---

function setAuthMode(isLogin) {
    isLoginMode = isLogin;
    clearError();

    // 1. Alterna o estado ativo dos botões
    if (tabLogin) tabLogin.classList.toggle('active', isLoginMode);
    if (tabRegister) tabRegister.classList.toggle('active', !isLoginMode);

    // 2. Esconde/mostra o campo de confirmação de senha
    if (groupConfirm) groupConfirm.classList.toggle('hidden', isLoginMode);
    
    // 3. Atualiza o texto do botão principal
    if (btnSubmit) btnSubmit.textContent = isLoginMode ? 'ENTER SYSTEM' : 'CREATE ACCOUNT';
    
    // 4. Se for registro, a confirmação de senha deve ser obrigatória
    if (inputConfirmPassword) inputConfirmPassword.required = !isLoginMode;
}

// Event Listeners para as abas
if (tabLogin) tabLogin.addEventListener('click', () => setAuthMode(true));
if (tabRegister) tabRegister.addEventListener('click', () => setAuthMode(false));

// --- Lógica de Autenticação com Email/Senha ---

if (authForm) {
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearError();

        const email = inputEmail.value;
        const password = inputPassword.value;
        const confirmPassword = inputConfirmPassword.value;

        if (!isLoginMode && password !== confirmPassword) {
            displayError("ERROR: Passwords do not match.");
            return;
        }

        try {
            if (isLoginMode) {
                // LOGIN
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
    });
}

// --- Lógica de Login com Google ---

if (btnGoogle) {
    btnGoogle.addEventListener('click', async () => {
        clearError();
        
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });

            if (error) throw error;
            
            // OAuth redirect happens automatically

        } catch (error) {
            console.error("Google Auth Error:", error);
            displayError(`ERROR: Google login failed. (${error.message})`);
        }
    });
}

// --- Lógica de Estado de Autenticação ---

// Verifica se o usuário já está logado
async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        console.log("User is already logged in:", session.user.email);
        window.location.href = 'index.html';
    }
}

checkSession();

// Inicializa o modo de login
setAuthMode(true);