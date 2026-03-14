describe('template spec', () => {
  it('passes', () => {
    const url: string = 'http://localhost:4200/';
    cy.visit(url);

    // make sure the URL defaults to ${url}/en/us

    cy.url().should('eq', `${url}en/us`);

    // this is technically legal... 
    cy.visit(`${url}data/entities`);
    // Not sure what we want to do with invalid language/region combinations

  })
})