document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.toLowerCase();
    const isProtectedPage = currentPath.includes('product.html') || currentPath.includes('cart.html');
    
    const isLoggedIn = localStorage.getItem('authState') === 'logged_in';

    if (isProtectedPage && !isLoggedIn) {
        window.location.href = 'login.html';
        return; 
    }

    const profileLink = document.querySelector('.header__action-btn[href="login.html"]');
    
    if (profileLink && isLoggedIn) {
        profileLink.href = '#'; 
        profileLink.title = 'Logout';
        
        profileLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('authState');
            window.location.href = 'index.html'; 
        });
    }

    const loginForm = document.querySelector('.auth-form');
    
    if (loginForm) {
        const errorMsg = document.createElement('p');
        errorMsg.style.color = '#FF3333';
        errorMsg.style.fontSize = '14px';
        errorMsg.style.display = 'none';
        errorMsg.style.marginBottom = '16px';
        errorMsg.style.textAlign = 'center';
        
        const submitBtn = document.querySelector('.auth-form__submit');
        loginForm.insertBefore(errorMsg, submitBtn);

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;

            if (emailInput === 'admin@example.com' && passwordInput === 'Admin@123') {
                localStorage.setItem('authState', 'logged_in');
                errorMsg.style.display = 'none';
                window.location.href = 'index.html';
            } else {
                errorMsg.textContent = 'Invalid email or password. Please try again.';
                errorMsg.style.display = 'block';
            }
        });
    }
    
});