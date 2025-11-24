describe('My First Test', () => {
  it('visits the page and clicks the button', () => {
    cy.visit('http://127.0.0.1:5500/learning/index.html');  // Load your HTML
    
    cy.get('h1')  // Find <h1> element
      .should('contain', 'Welcome to Cypress!');  // Assert it has the text
    
    cy.get('#myButton')  // Find button by ID
      .click();  // Click it
    
    cy.get('#counter')  // Find <p>
      .should('contain', 'Clicks: 1');  // Assert text updated

    cy.get('#username')
      .type('Anik Mistry')

    cy.get('#submitBtn')
      .click()

    cy.get('#greeting')
      .should('contain','Hello, Anik Mistry')

    cy.get('#navLink')
      .click()

    cy.url().should('include','/page2.html')
    cy.get('h1').should('contain','Page 2 Loaded')

    cy.get('#backBtn').click()
    cy.url().should('include','/index.html')

    // cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/1', {
    //   statusCode: 200,
    //   body: {
    //     id: 333,
    //     name: 'Anik Mistry',
    //     email: 'anik@gmail.com'
    //   }
    // }).as('getUserr');
    // cy.wait('@getUser');
    // cy.get('#userInfo').should('contain', 'Test User').should('contain', 'anik@gmail.com');
    // cy.get('@getUser').its('request.body').should('be.empty')

  });
});
describe('API Handling', () => {
  it('intercepts API and stubs response', () => {
    // Stub the API call BEFORE visiting (intercepts all matching requests)
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/1', {
      statusCode: 200,  // Success
      body: {  // Custom fake data
        id: 999,
        name: 'Test User',
        email: 'test@example.com'
      }
    }).as('getUser');  // Alias for later spying

    cy.visit('http://127.0.0.1:5500/learning/index.html');  // Page loads, triggers fetch

    // Wait for the stubbed response & assert on DOM
    cy.wait('@getUser');  // Waits for the aliased request
    cy.get('#userInfo')  // Element from API
      .should('contain', 'Test User')
      .should('contain', 'test@example.com');

    // Bonus: Spy on request details
    cy.get('@getUser').its('request.body').should('be.empty');  // No body on GET
  });

  it('handles API errors gracefully', () => {
    // Stub a failure
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/1', {
      statusCode: 404,  // Not found
      body: { error: 'User not found' }
    }).as('getUserFail');

    cy.visit('http://127.0.0.1:5500/learning/index.html');

    // Assert app handles error (in our case, it logs to console—check Cypress console!)
    cy.wait('@getUserFail');
    cy.get('#userInfo').should('not.exist');  // No element if fetch fails

    // Or assert on console error (Cypress spies on console)
    cy.window().its('console.error').should('be.calledWith', 'API fail:');
  });
});
