/// <reference types="cypress" />

import adminSection from "../fixtures/adminSection.json";

describe("Login as admin", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });
  it("gives access to website", () => {
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("gives access to admin page", () => {
    cy.visit("http://localhost:3000/admin");
    cy.get("dl > :nth-child(1)").should("contain.text", adminSection.userDT);
    cy.get("dl > :nth-child(3)").should("contain.text", adminSection.groupDT);
  });

  it("gives access to sub admin/ pages", () => {
    cy.visit("http://localhost:3000/admin");
    cy.get("dl > :nth-child(2) > a").click();
    cy.url().should("eq", "http://localhost:3000/admin/user");
    cy.get(":nth-child(4) > a").click();
    cy.get("dl > :nth-child(4) > a").click();
    cy.url().should("eq", "http://localhost:3000/admin/group");
  });
});
