/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login page is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Password')
    cy.contains('Username')
    cy.contains('Login')
  })
})
