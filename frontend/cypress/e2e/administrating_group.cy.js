/// <reference types="cypress" />
import inputs from "../fixtures/inputs.json";
describe("operation on group table:", () => {
  it("User tries to access admin/group redirects to unauthorized page", () => {
    cy.loginAsUser();
    cy.visit("http://localhost:3000/admin/group");
    cy.wait(100);
    cy.url().should("eq", "http://localhost:3000/unauthorized");
  });

  it("Admin Add,edit and delete new group works and is permitted", () => {
    cy.loginAsAdmin();
    cy.visit("http://localhost:3000/admin/group");
    cy.wait(350);

    //Add Group
    addGroup();
    setLogoText(inputs.add.logo);
    setGroupName(inputs.add.name);
    setGroupMotto(inputs.add.motto);
    clickSave();
    cy.wait(500);
    checkLastGroupElementForText(inputs.add.name);
    checkLastGroupElementForText(inputs.add.motto);

    //Edit Group
    editLastGroupInList();
    cy.wait(100);
    setLogoText(inputs.edit.logo);
    setGroupName(inputs.edit.name);
    setGroupMotto(inputs.edit.motto);
    clickSave();
    cy.wait(500);
    checkLastGroupElementForText(inputs.edit.name);
    checkLastGroupElementForText(inputs.edit.motto);
    //delete group
    deleteLastGroupInList();
    cy.wait(250);
    checkLastGroupElementForNotContainingText(inputs.edit.name);
    checkLastGroupElementForNotContainingText(inputs.edit.motto);
  });
});

function checkLastGroupElementForText(text) {
  cy.get(".group").last().should("contain.text", text);
}

function checkLastGroupElementForNotContainingText(text) {
  cy.get(".group").last().should("not.contain.text", text);
}

function deleteLastGroupInList() {
  cy.get(".delete_button").last().click();
}

function editLastGroupInList() {
  cy.get(".edit_button").last().click();
}

function addGroup() {
  cy.get('[style="margin: 3vw;"] > :nth-child(1)').click();
}

function setLogoText(text) {
  cy.get(":nth-child(2) > input").clear().type(text);
}

function setGroupName(text) {
  cy.get(":nth-child(3) > input").clear().type(text);
}

function setGroupMotto(text) {
  cy.get(":nth-child(4) > input").clear().type(text);
}

function clickSave() {
  cy.get(
    '[style="display: flex; align-items: center;"] > :nth-child(2) > button'
  ).click();
}
