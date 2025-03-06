describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('baidu', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('www.baidu.com');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[href="https://pan.baidu.com?from=1026962h"]').click();
    cy.get('#kw').clear('n');
    cy.get('#kw').type('你好');
    cy.get('#kw').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Google', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('www.google.com.hk');

    /* ==== End Cypress Studio ==== */
  });
})