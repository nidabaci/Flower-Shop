describe('Shipping and Payment Form', function() {

  it('the main page should exist', function(browser) {
    browser
      .url('http://localhost:8080/')
      .assert
        .elementPresent('h1');
  });

  it('the payment page should exist', function(browser) {
    browser
      .url('http://localhost:8080/payment/')
      .assert
        .elementPresent('h1');
  });

  it('the payment page should exist', function(browser) {
    browser
      .url('http://localhost:8080/payment/')
      .assert
        .elementPresent('form[name="payment"]');
  });

  it('the billing page should exist', function(browser) {
    browser
      .url('http://localhost:8080/billing/')
      .assert
        .elementPresent('form[name="billing"]');
  });

  it('the shipping page should exist', function(browser) {
    browser
      .url('http://localhost:8080/shipping/')
      .assert
        .elementPresent('form[name="shipping"]');
  });

  it('show incorrect errors on payment form', function(browser) {
    browser
      .url('http://localhost:8080/payment/')
      .executeScript(function() {
        localStorage.clear();
      })
      .sendKeys('input#name-card', 'Oh')
      .sendKeys('input#card-number', '12345')
      .sendKeys('input#cvv', '12345')
      .waitForElementPresent('.cvv-error')
      .assert.visible('.cvv-error')
      .assert.visible('.card-number-error')
      .assert.visible('.name-card-error')
      .assert.textContains('.cvv-error', 'Cvv must be a valid CVV number')
      .assert.textContains('.card-number-error', 'Card-number must be a valid credit card')
      .assert.textContains('.name-card-error', 'Name-card must be at least 3 characters');
  });

  it('show incorrect errors on billing form', function(browser) {
    browser
      .url('http://localhost:8080/billing/')
      .executeScript(function() {
        localStorage.clear();
      })
      .sendKeys('input#billing-name', 'oh')
      .sendKeys('input#billing-address', 'my')
      .sendKeys('input#billing-city', 'h')
      .sendKeys('input#billing-zip', '111111')
      .sendKeys('input#billing-phone', '7')
      .waitForElementPresent('.billing-phone-error')
      .assert.visible('.billing-phone-error')
      .assert.visible('.billing-zip-error')
      .assert.visible('.billing-address-error')
      .assert.visible('.billing-name-error')
      .assert.textContains('.billing-phone-error', 'Billing-phone must be a valid telephone number')
      .assert.textContains('.billing-zip-error', 'Billing-zip must be a valid ZIP code')
      .assert.textContains('.billing-address-error', 'Billing-address must be at least 3 characters')
      .assert.textContains('.billing-name-error', 'Billing-name must be at least 3 characters');
  });

  it('show incorrect errors on shipping form', function(browser) {
    browser
      .url('http://localhost:8080/shipping/')
      .executeScript(function() {
        localStorage.clear();
      })
      .click('input[id="shipping-is-billing"]')
      .sendKeys('input#shipping-name', 'oh')
      .sendKeys('input#shipping-address', 'my')
      .sendKeys('input#shipping-zip', '111111')
      .sendKeys('input#shipping-phone', '7')
      .waitForElementPresent('.shipping-phone-error')
      .assert.visible('.shipping-phone-error')
      .assert.visible('.shipping-zip-error')
      .assert.visible('.shipping-address-error')
      .assert.visible('.shipping-name-error')
      .assert.visible('.shipping-phone-error')
      .assert.visible('.shipping-zip-error')
      .assert.visible('.shipping-address-error')
      .assert.visible('.shipping-name-error')
      .assert.textContains('.shipping-phone-error', 'Shipping-phone must be a valid telephone number')
      .assert.textContains('.shipping-zip-error', 'Shipping-zip must be a valid ZIP code')
      .assert.textContains('.shipping-address-error', 'Shipping-address must be at least 3 characters')
      .assert.textContains('.shipping-name-error', 'Shipping-name must be at least 3 characters');
  });

});
