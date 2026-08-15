// const VALID_EMAIL = 'admin@example.com';
// const VALID_PASSWORD = 'Admin@123';

// const protectedPages = ['product.html', 'cart.html'];

// const currentPage = window.location.pathname.split('/').pop();

// if (protectedPages.includes(currentPage)) {
//     const isLoggedIn = localStorage.getItem('isAuthenticated');
    
//     if (isLoggedIn !== 'true') {
//         window.location.href = 'login.html';
//     }
// }

// if (currentPage === 'login.html' && localStorage.getItem('isAuthenticated') === 'true') {
//     window.location.href = 'index.html';
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.getElementById('login-form');
    
//     if (loginForm) {
//         loginForm.addEventListener('submit', function(event) {
//             event.preventDefault();
            
//             const emailInput = document.getElementById('email').value.trim();
//             const passwordInput = document.getElementById('password').value.trim();
//             const errorMessage = document.getElementById('login-error-message');
            
//             if (emailInput === VALID_EMAIL && passwordInput === VALID_PASSWORD) {
//                 localStorage.setItem('isAuthenticated', 'true');
//                 window.location.href = 'index.html';
//             } else {
//                 errorMessage.textContent = 'Invalid email or password. Please try again.';
//                 errorMessage.style.color = '#ff3333';
//                 errorMessage.style.marginBottom = '15px';
//                 errorMessage.style.fontSize = '14px';
//             }
//         });
//     }

//     const logoutButtons = document.querySelectorAll('.logout-btn');
    
//     logoutButtons.forEach(button => {
//         button.addEventListener('click', (event) => {
//             event.preventDefault();
//             localStorage.removeItem('isAuthenticated');
//             window.location.href = 'login.html';
//         });
//     });
// });