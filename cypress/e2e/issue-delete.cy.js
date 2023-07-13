describe('Issue deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains(task).click();
      });
    });
//constant values
    const task = 'This is an issue of type: Task.'
    const deleteissue = 'Delete issue'
    const canceldel = 'Cancel'
// Constant selectors
    const detailsmodal = '[data-testid="modal:issue-details"]'
    const listissue = '[data-testid="list-issue"]'
    const trash = '[data-testid="icon:trash"]'
    const confirm = '[data-testid="modal:confirm"]'
    

    it('Should delete an issue', () => {
        //System finds modal for creating issue and does next steps inside of it
        cy.get(listissue).contains(task)
          cy.wait(2000)
          //Assert that issue detail view modal is visible
          cy.get(detailsmodal).should('be.visible')
          cy.get(trash).click()
          cy.get(confirm).children().children().contains(deleteissue).click()
          //Assert that confirmation modal is not visible
          cy.get(confirm).should('not.exist')
          cy.get(listissue).contains(task).should('not.exist')
        
        });
        
    it('Should cancel deleteing an issue', () => {
        //System finds modal for creating issue and does next steps inside of it
        cy.get(listissue).contains(task)
          cy.wait(2000)

          //Assert that issue detail view modal is visible
          cy.get(detailsmodal).should('be.visible')
          cy.get(trash).click()
          cy.get(confirm).children().children().contains(canceldel).click()
          cy.get('[size="24"][data-testid="icon:close"]').click()

          //Assert that confirmation modal is not visible
          cy.get(confirm).should('not.exist')
          cy.get(listissue).contains(task).should('exist')
            
            });
});
