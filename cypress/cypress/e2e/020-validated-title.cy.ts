describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.contains('Say Hello Coming Soon...')
  .should('be.visible')
  })
})