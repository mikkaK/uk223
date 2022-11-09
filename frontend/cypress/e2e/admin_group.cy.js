/// <reference types="cypress" />
import Data from "../fixtures/example.json";
describe("operation on group table:", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });

  it("Add,edit and delete new group", () => {
    cy.visit("http://localhost:3000/admin/group");
    cy.wait(350);

    //Add Group
    addGroup();
    setLogoText(Data.add.logo);
    setGroupName(Data.add.name);
    setGroupMotto(Data.add.motto);
    clickSave();

    checkLastGroupElementForText(Data.add.logo);
    checkLastGroupElementForText(Data.add.name);
    checkLastGroupElementForText(Data.add.motto);

    //Edit Group
    editLastGroupInList();
    setLogoText(Data.edit.logo);
    setGroupName(Data.edit.name);
    setGroupMotto(Data.edit.motto);
    clickSave();
    checkLastGroupElementForText(Data.edit.logo);
    checkLastGroupElementForText(Data.edit.name);
    checkLastGroupElementForText(Data.edit.motto);

    //delete group
    deleteLastGroupInList();
  });
});

function checkLastGroupElementForText(text) {
  cy.get(".group").last().should("contain.text", text);
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

function clickQuit() {
  cy.get(
    '[style="margin-left: 10vw;"] > [style="display: flex; align-items: center;"] > :nth-child(1) > button'
  ).click();
}

function getGroupListLength() {
  cy.get('[style="margin: 3vw;"] > :nth-child(2) > :nth-child(1) >').should(
    "have.length",
    2
  );
  var x = cy
    .get('[style="margin: 3vw;"] > :nth-child(2) > :nth-child(1) >')
    .its("length");
  x.should("eq", 2);
  console.log(x);
}
