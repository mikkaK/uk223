/// <reference types="cypress" />
import group from "../fixtures/group.json";
import error from "../fixtures/error.json";
import user from "../fixtures/user.json";
describe("User:", () => {
  beforeEach(() => {
    cy.request({
      url: "http://localhost:8080/user/",
      method: "PUT",
      auth: {
        bearer: user.bearerToken.admin,
      },
      body: {
        userId: user.user.id,
        groupId: group.group1.id,
      },
    });
    cy.loginAsUser();
  });
  it("has access to open group he is in", () => {
    cy.visit("http://localhost:3000/group/" + group.group1.id);
    cy.wait(100);
    cy.get('[style="margin-top: auto; margin-bottom: auto;"] > p').should(
      "contain.text",
      group.group1.name
    );
  });

  it("does not have access to group he is not in", () => {
    cy.visit("http://localhost:3000/group/" + group.group1.id);
    cy.get("#root > :nth-child(1) > :nth-child(2)").should(
      "contain.text",
      error.errorStandart
    );
  });
});

describe("Admin:", () => {
  beforeEach(() => {
    cy.request({
      url: "http://localhost:8080/user/",
      method: "PUT",
      auth: {
        bearer: user.bearerToken.admin,
      },
      body: {
        userId: user.admin.id,
        groupId: group.group1.id,
      },
    });
    cy.loginAsAdmin();
  });
  it("has access to open group he is in", () => {
    cy.visit("http://localhost:3000/group/" + group.group1.id);
    cy.wait(100);
    cy.get('[style="margin-top: auto; margin-bottom: auto;"] > p').should(
      "contain.text",
      group.group1.name
    );
  });

  it("has access to group he is not in", () => {
    cy.visit("http://localhost:3000/group/" + group.group2.id);
    cy.wait(100);
    cy.get('[style="margin-top: auto; margin-bottom: auto;"] > p').should(
      "contain.text",
      group.group2.name
    );
  });
});
