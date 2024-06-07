import baseUrl from "../../src/utils/baseUrl";

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.request('GET', `${baseUrl}/upcoming`, { fixture: 'matches.json' }).as('getTop6Matches');
  });

  it('should display the list of matches', () => {
    cy.get('@getTop6Matches', { timeout: 10000 })
    cy.get('.matches-list .match-item').should('have.length', 6); 
  });


  it('should not open chat popup', () => {
    cy.get('.chat-button').should('be.visible').click();
    cy.get('.chat-popup').should('not.exist');
  });
});

describe('NavBar Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display login link when user is not logged in', () => {
    cy.logout();
    cy.visit('/');
    cy.get('.login a').should('contain.text', 'LOGIN');
  });

  it('should display user profile and logout links when user is logged in', () => {
    cy.login();
    cy.visit('/');
    cy.get('.login a').should('contain.text', 'USER PROFILE');
    cy.get('.logout button').should('contain.text', 'LOGOUT');
  });
  
  it('should display USERS and TICKETS links for ADMIN or CUSTOMER_SERVICE roles', () => {
    cy.login('ADMIN');
    cy.visit('/');
    cy.get('.nav-link').contains('USERS').should('be.visible');
    cy.get('.nav-link').contains('TICKETS').should('be.visible');


    cy.logout();

    cy.login('CUSTOMER_SERVICE');
    cy.visit('/');
    cy.get('.nav-link').contains('USERS').should('be.visible');
    cy.get('.nav-link').contains('TICKETS').should('be.visible');
  });

  it('should display RANKINGS link for non-admin users', () => {
    cy.login();
    cy.visit('/');
    cy.get('.nav-link').contains('RANKINGS').should('be.visible');
  });

  it('should navigate to login page when login link is clicked', () => {
    cy.logout();
    cy.visit('/');
    cy.get('.login a').contains('LOGIN').click();
    cy.url().should('include', '/login');
  });

  it('should navigate to user profile page when user profile link is clicked', () => {
    cy.login();
    cy.visit('/');
    cy.get('.login a').contains('USER PROFILE').click();
    cy.url().should('include', '/userProfile');
  });

  it('should log out the user when logout button is clicked', () => {
    cy.login();
    cy.visit('/');
    cy.get('.logout button').contains('LOGOUT').click();

    cy.on('window:confirm', () => true);
    cy.logout();
    cy.visit('/');
    cy.get('.login a').should('contain', 'LOGIN');
  })
});