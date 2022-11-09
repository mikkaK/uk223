/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });

  it("Does not do much!", () => {
    cy.visit("http://localhost:3000/group");
    expect(cy.get("#root > :nth-child(1) > :nth-child(1) > :nth-child(2)"))
      .exist;
  });
});
