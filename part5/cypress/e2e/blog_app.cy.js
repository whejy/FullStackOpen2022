describe('Blog app', function () {
  beforeEach(function () {
    // Reset test DB
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // Create new user
    const user = {
      name: 'JBrown',
      username: 'testUser',
      password: 'test321',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('login page is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Password')
    cy.contains('Username')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="Username"]').type('testUser')
      cy.get('input[name="Password"]').type('test321')
      cy.get('#login-button').click()

      cy.contains('JBrown logged in')
    })

    it('fails with incorrect credentials', function () {
      cy.get('input[name="Username"]').type('testUser')
      cy.get('input[name="Password"]').type('wrong')
      cy.get('#login-button').click()

      cy.get('#error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'JBrown logged in')
    })
  })
})
