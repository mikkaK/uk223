/// <reference types="cypress" />

describe("Login as admin", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });
  it("gives access to website", () => {
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("gives access to admin page", () => {
    cy.visit("http://localhost:3000/admin");
    cy.get("dl > :nth-child(1)").should("contain.text", "User");
    cy.get("dl > :nth-child(3)").should("contain.text", "Group");
  });

  it("gives access to sub admin/ pages", () => {
    cy.visit("http://localhost:3000/admin");
    cy.get("dl > :nth-child(2) > a").click();
    cy.url().should("eq", "http://localhost:3000/admin/user");
    cy.get(
      '[style="display: flex; box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 16px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px; padding: 5px;"] > :nth-child(4) > a'
    ).click();
    cy.get("dl > :nth-child(4) > a").click();
    cy.url().should("eq", "http://localhost:3000/admin/group");
  });
});
