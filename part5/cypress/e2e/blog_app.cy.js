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
        cy.contains('A Second Blog').contains('View').click()

        cy.contains('A Second Blog')
          .parent()
          .find('.likesCount')
          .should('contain', 'Likes: 0')

        cy.contains('Like').click()

        cy.contains('A Second Blog')
          .parent()
          .find('.likesCount')
          .should('contain', 'Likes: 1')
      })

      it('it can be deleted by its creator', function () {
        cy.contains('A Second Blog').contains('Remove').click()

        cy.should('not.contain', 'A Second Blog')
      })

      it('and cannot be deleted by a different user', function () {
        cy.contains('Logout').click()

        const newUser = {
          name: 'BSmith',
          username: 'newUser',
          password: 'test123',
        }

        cy.request('POST', 'http://localhost:3003/api/users', newUser)
        cy.login({ username: 'newUser', password: 'test123' })
        cy.contains('BSmith logged in')

        cy.contains('A Second Blog').and('not.contain', 'Remove')
      })
    })
  })

  describe.only('Blogs are sorted by likes', function () {
    beforeEach(function () {
      cy.login({ username: 'testUser', password: 'test321' })
      cy.createBlog({
        title: 'First Blog',
        author: 'Nobody',
        url: 'www.test.com',
      })
      cy.createBlog({
        title: 'A Second Blog',
        author: 'Nobody',
        url: 'www.test.com',
      })
      cy.createBlog({
        title: 'A Third Blog',
        author: 'Nobody',
        url: 'www.test.com',
      })
    })

    it('three blogs are created', function () {
      cy.get('#blogsList').children().should('have.length', 3)
    })

    it('and are ordered by number of likes', function () {
      cy.contains('First Blog')
        .parent()
        .as('FirstBlog')
        .contains('View')
        .click()
        .parent()
        .parent()
        .contains('Like')
        .as('LikeFirst')

      cy.contains('A Second Blog')
        .parent()
        .as('SecondBlog')
        .contains('View')
        .click()
        .parent()
        .parent()
        .contains('Like')
        .as('LikeSecond')

      cy.contains('A Third Blog')
        .parent()
        .as('ThirdBlog')
        .contains('View')
        .click()
        .parent()
        .parent()
        .contains('Like')
        .as('LikeThird')

      cy.get('@LikeThird').click()
      cy.wait(200)
      cy.get('@LikeThird').click()
      cy.wait(200)
      cy.get('@LikeThird').click()
      cy.wait(200)
      cy.get('@LikeFirst').click()
      cy.wait(200)
      cy.get('@LikeSecond').click()
      cy.wait(200)
      cy.get('@LikeSecond').click()
      cy.wait(200)

      cy.get('.blog')
        .eq(0)
        .should('contain', 'A Third Blog')
        .and('contain', 'Likes: 3')
      cy.get('.blog')
        .eq(1)
        .should('contain', 'A Second Blog')
        .and('contain', 'Likes: 2')
      cy.get('.blog')
        .eq(2)
        .should('contain', 'First Blog')
        .and('contain', 'Likes: 1')
    })
  })
})
