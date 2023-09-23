describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.visit('http://notes-serverless-app.com/login')

    cy.get('#email').type(Cypress.env('user_email'))
    cy.get('#password').type(Cypress.env('user_password'), { log: false })
    cy.get('button[type="submit"]').click()
    
    cy.contains('h1', 'Your Notes').should('be.visible')
   
  })

  it('CRUDs a note', () => {
    //Create a note
    cy.contains('Create a new note').click()
    cy.get('#content').type('My note')
    cy.contains('Create').click()

    //Assert the note was created
    cy.get('.list-group').contains('My note').click()

    //Updates the note
    cy.get('#content').type(' updated')
    cy.contains('Save').click()

    //Asserts the note was update
    cy.get('.list-group').should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)').should('be.visible')
      

    //Deletes the note
    cy.get('.list-group').contains('My note updated').click()
    cy.contains('Delete').click()

    //Asserts the list has at least one itm before asserting the note deletion
    //this way, we make sure the list of notes has already rendered
    cy.get('.list-group a')
      .its('length')
      .should('be.at.least', 1)

    //Asserts the not was deleted
    cy.get('.list-group:contains(My note updated)').should('not.exist')

  })
})
