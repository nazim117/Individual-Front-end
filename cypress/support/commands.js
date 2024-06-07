// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (role = 'FOOTBALL_FAN') => {
    const roles = {
        FOOTBALL_FAN: {roles: ['FOOTBALL_FAN']},
        ADMIN: {roles: ['ADMIN']},
        CUSTOMER_SERVICE: {roles: ['CUSTOMER_SERVICE']},
    };

    window.localStorage.setItem('claims', JSON.stringify({
        sub: 'user@example.com',
        roles: roles[role].roles,
        access_token: 'fake-token'
    }));
});

Cypress.Commands.add('logout', () => {
    window.localStorage.removeItem('token');
})