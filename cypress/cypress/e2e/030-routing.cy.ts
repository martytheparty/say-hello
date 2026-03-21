describe('template spec', () => {
  it('passes', () => {
    // Use relative URLs so Cypress prepends the baseUrl automatically
    cy.visit('/');

    // Cypress will combine baseUrl + path
    // Expect the app to redirect to /en/us by default
    cy.url().should('eq', `${Cypress.config('baseUrl')}/en/us`);

    // Visit another page (relative to baseUrl)
    cy.visit('/data/entities');

    // TODO: decide what to do with invalid language/region combinations
    // e.g., you could check for a 404 page, default redirect, or error message
  });
});