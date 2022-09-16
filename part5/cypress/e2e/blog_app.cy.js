describe('Blog app', function () {
  beforeEach(function () {
    // Reset test DB
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testUser', password: 'test321' })
    })

    it('A new blog can be created via form', function () {
      cy.get('#toggleButton').click()
      cy.get('input[name="Title"]').type('A Test Blog')
      cy.get('input[name="Author"]').type('Mr Brown')
      cy.get('input[name="Url"]').type('www.test.com')

      cy.contains('Add').click()

      cy.get('#success')
        .should('contain', 'Successfully added blog - A Test Blog')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains('A Test Blog - Mr Brown')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'A Second Blog',
          author: 'Nobody',
          url: 'www.tester.com',
        })
      })

      it('it can have its likes increased', function () {
        cy.contains('A Second Blog')
      })
    })
  })
})
