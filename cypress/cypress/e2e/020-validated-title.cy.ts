describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.contains('Welcome To The Say Hello Project')
  .should('be.visible')
  })
})