describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/');
    cy.contains('Say Hello Coming Soon...')
  .should('be.visible')
  })
})