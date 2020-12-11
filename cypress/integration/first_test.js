describe("My First Test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("https://app.arboreum.dev")
    cy.contains("Invest").click()

    cy.get("#input-username-for-credentials-provider").type("gp@arboreum.dev")

    cy.contains("Sign in").click()

    // cy.get("input[name='firstname']").type("Gaurav")
    // cy.get("input[name='lastname']").type("Paruthi")
    // cy.get("input[name='phone']").type("+1734323424")
    // cy.contains("Submit").click()

    // cy.visit("https://app.arboreum.dev/api/auth/signout")
    // cy.contains("Sign out").click()
    cy.get(".chakra-stat").within(() => {
      cy.get("span").should("have.text", "₹0")
    })
  })
})
