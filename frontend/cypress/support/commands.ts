/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add("loginAsAdmin", () => {
  cy.visit("http://localhost:3000/login");
  cy.get("[id=email]").type("admin@example.com");
  cy.get("[id=password]").type("1234");
  cy.get("button[type=submit]").click();
  cy.wait(500);
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginAsAdmin(email: string, password: string): Chainable<void>;
    }
  }
}
