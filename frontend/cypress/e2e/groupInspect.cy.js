/// <reference types="cypress" />
describe("User:", () => {
  beforeEach(() => {
    cy.request({
      url: "http://localhost:8080/user/",
      method: "PUT",
      auth: {
        bearer:
          "eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiVVNFUl9DUkVBVEUifSx7ImF1dGhvcml0eSI6IlVTRVJfUkVBRCJ9LHsiYXV0aG9yaXR5IjoiVVNFUl9NT0RJRlkifSx7ImF1dGhvcml0eSI6IlVTRVJfREVMRVRFIn1dLCJzdWIiOiI2YTQ2YzAwMi1mNWQ1LTRhODAtOWRhYy01NWY5N2VkOTdjN2IiLCJpYXQiOjE2NjgwODM4MzUsImV4cCI6MTY2ODE4MzgzNSwiaXNzIjoidWsyMjMifQ.Dy6UVWD1k7nvQ9of5O8n4PyymNvToa7pPyS-XF6yaDg",
      },
      body: {
        userId: "233c019c-e0c0-4893-bfc1-d0aab176a8ae",
        groupId: "406a23f2-a483-481d-9564-54c13061e683",
      },
    });
    cy.loginAsUser();
  });
  it("has access to open group he is in", () => {
    cy.visit(
      "http://localhost:3000/group/406a23f2-a483-481d-9564-54c13061e683"
    );
    cy.wait(100);
    cy.get('[style="margin-top: auto; margin-bottom: auto;"] > p').should(
      "contain.text",
      "example"
    );
  });

  it("does not have access to group he is not in", () => {
    cy.visit(
      "http://localhost:3000/group/4f2ee6c0-189d-4d79-9056-d56917d4d8ac"
    );
    cy.get("#root > :nth-child(1) > :nth-child(2)").should(
      "contain.text",
      "Error has occured"
    );
  });
});

describe("Admin:", () => {
  beforeEach(() => {
    cy.request({
      url: "http://localhost:8080/user/",
      method: "PUT",
      auth: {
        bearer:
          "eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiVVNFUl9DUkVBVEUifSx7ImF1dGhvcml0eSI6IlVTRVJfUkVBRCJ9LHsiYXV0aG9yaXR5IjoiVVNFUl9NT0RJRlkifSx7ImF1dGhvcml0eSI6IlVTRVJfREVMRVRFIn1dLCJzdWIiOiI2YTQ2YzAwMi1mNWQ1LTRhODAtOWRhYy01NWY5N2VkOTdjN2IiLCJpYXQiOjE2NjgwODM4MzUsImV4cCI6MTY2ODE4MzgzNSwiaXNzIjoidWsyMjMifQ.Dy6UVWD1k7nvQ9of5O8n4PyymNvToa7pPyS-XF6yaDg",
      },
      body: {
        userId: "6a46c002-f5d5-4a80-9dac-55f97ed97c7b",
        groupId: "406a23f2-a483-481d-9564-54c13061e683",
      },
    });
    cy.loginAsAdmin();
  });
  it("has access to open group he is in", () => {
    cy.visit(
      "http://localhost:3000/group/406a23f2-a483-481d-9564-54c13061e683"
    );
    cy.wait(100);
    cy.get('[style="margin-top: auto; margin-bottom: auto;"] > p').should(
      "contain.text",
      "example"
    );
  });

  it("has access to group he is not in", () => {
    cy.visit(
      "http://localhost:3000/group/4f2ee6c0-189d-4d79-9056-d56917d4d8ac"
    );
    cy.wait(100);
    cy.get('[style="margin-top: auto; margin-bottom: auto;"] > p').should(
      "contain.text",
      "example2"
    );
  });
});
