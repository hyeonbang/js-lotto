const $purchaseInput = '[data-cy="purchase-amount"]';
const $purchaseButton = '[data-cy="purchase-button"]';
const $lottoTickets = '[data-cy="lotto-tickets"]';
const $lottoNumbersToggleButton = '[data-cy="toggle-lotto-numbers"]';

Cypress.Commands.add('typePurchaseInput', (price) => {
    cy.get($purchaseInput).type(price);
})

Cypress.Commands.add('clickPurchaseButton', () => {
    cy.get($purchaseButton).click();
})

Cypress.Commands.add('clickLottoNumbersToggleButton', () => {
    return cy.get($lottoNumbersToggleButton).click();
})

Cypress.Commands.add('checkTicketUnit', (length) => {
    cy.get($lottoTickets).children('li').should('have.length', length);
})