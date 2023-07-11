import { faker } from '@faker-js/faker';
describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //System will already open issue creating modal in beforeEach block  
    cy.visit(url + '/board?modal-issue-create=true');
    });
  });
 
  it('Should create an issue and validate it successfully', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      
      //open issue type dropdown and choose Story
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
          .trigger('click');
            
      //Type value to description input field
      cy.get('.ql-editor').type('TEST_DESCRIPTION');

      //Type value to title input field
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type('TEST_TITLE');
      
      //Select Lord Gaben from reporter dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('TEST_TITLE');
      //Assert that correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
      cy.get('[data-testid="icon:story"]').should('be.visible');
    });
  });

  it('Should validate title is required field if missing', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //Try to click create issue button without filling any data
      cy.get('button[type="submit"]').click();

      //Assert that correct error message is visible
      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });
});

it('Should create an issue and validate it successfully vol2', () => {
  // System finds modal for creating an issue and performs the next steps inside it
  cy.visit("https://jira.ivorreic.com/project/board?modal-issue-create=true")
  cy.wait(4000)
  cy.get('[data-testid="icon:plus"]').trigger("mouseover").click()
  cy.get('[data-testid="modal:issue-create"]').should("be.visible").within(() => {
    // Open issue type dropdown and choose "Bug"
    cy.get('[data-testid="select:type"]').click();
    cy.get('[data-testid="select-option:Bug"]').click();

    // Type value in the description input field
    cy.get('.ql-editor').type('My bug description');

    // Type value in the title input field
    // Order of filling in the fields is first description, then title on purpose
    // Otherwise filling title first sometimes doesn't work due to web page implementation
    cy.get('input[name="title"]').type('Bug');

    // Select "Pickle Rick" from the reporter dropdown
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="select-option:Pickle Rick"]').click();
    // Select "Highest" from the Priority dropdown
    cy.get('[data-testid="select:priority"]').click();
    cy.get('[data-testid="select-option:Highest"]').click();

    // Click on the "Create issue" button
    cy.get('button[type="submit"]').click();
  });

  // Assert that the modal window is closed and the successful message is visible
  cy.get('[data-testid="modal:issue-create"]').should('not.exist');
  cy.contains('Issue has been successfully created.').should('be.visible');

  // Reload the page to be able to see the recently created issue
  // Assert that the successful message has disappeared after the reload
  cy.wait(3000)
  cy.reload()
  cy.contains('Issue has been successfully created.').should('not.exist');

  // Assert that only one list with the name "Backlog" is visible and perform steps inside it
  cy.get('[data-testid="board-list:backlog"]').should('be.visible').should('have.length', 1).within(() => {
    // Assert that this list contains 5 issues and the first element with the tag "p" has the specified text
    cy.get('[data-testid="list-issue"]').should('have.length', 5)
      .first().find('p').contains('Bug');
    // Assert that the correct avatar and type icon are visible
    cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
    cy.get('[data-testid="icon:story"]').should('be.visible');
  });
});

it('Should validate title as a required field if missing', () => {
  // System finds the modal for creating an issue and performs the next steps inside it
  cy.get('[data-testid="modal:issue-create"]').within(() => {
    // Try to click the create issue button without filling any data
    cy.get('button[type="submit"]').click();

    // Assert that the correct error message is visible
    cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
  });
});

it('Should create an issue and validate it successfully using faker', () => {
  // System finds modal for creating an issue and performs the next steps inside it
  var desc=faker.lorem.lines(2);
  var name=faker.lorem.word(5)
  cy.visit("https://jira.ivorreic.com/project/board?modal-issue-create=true")
  cy.wait(4000)
  cy.get('[data-testid="icon:plus"]').trigger("mouseover").click()
  cy.get('[data-testid="modal:issue-create"]').should("be.visible").within(() => {
    // Open issue type dropdown and choose "Task"
    cy.get('[data-testid="select:type"]').contains('Task');
    // Use faker plugin in the description input field
    cy.get('.ql-editor').type(desc);

    // Use faker plugin in the title input field
    // Order of filling in the fields is first description, then title on purpose
    // Otherwise filling title first sometimes doesn't work due to web page implementation
    cy.get('input[name="title"]').type(name);

    // Select "Baby Yoda" from the reporter dropdown
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="select-option:Baby Yoda"]').click();
    // Select "Low" from the Priority dropdown
    cy.get('[data-testid="select:priority"]').click();
    cy.get('[data-testid="select-option:Low"]').click();

    // Click on the "Create issue" button
    cy.get('button[type="submit"]').click();
  });

  // Assert that the modal window is closed and the successful message is visible
  cy.get('[data-testid="modal:issue-create"]').should('not.exist');
  cy.contains('Issue has been successfully created.').should('be.visible');

  // Reload the page to be able to see the recently created issue
  // Assert that the successful message has disappeared after the reload
  cy.wait(3000)
  cy.reload()
  cy.contains('Issue has been successfully created.').should('not.exist');

  // Assert that only one list with the name "Backlog" is visible and perform steps inside it
  cy.get('[data-testid="board-list:backlog"]').should('be.visible').should('have.length', 1).within(() => {
    // Assert that this list contains 5 issues and the first element with the tag "p" has the specified text
    cy.get('[data-testid="list-issue"]').should('have.length', 5)
      .first().find('p').contains(name);
    // Assert that the correct avatar and type icon are visible
    cy.get('[data-testid="avatar:Baby Yoda"]').should('be.visible');
    cy.get('[data-testid="icon:Task"]').should('be.visible');
  });
});

it('Should validate title as a required field if missing', () => {
  // System finds the modal for creating an issue and performs the next steps inside it
  cy.get('[data-testid="modal:issue-create"]').within(() => {
    // Try to click the create issue button without filling any data
    cy.get('button[type="submit"]').click();

    // Assert that the correct error message is visible
    cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
  });
});