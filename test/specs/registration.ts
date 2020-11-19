import * as faker from 'faker';
import * as assert from 'assert';

describe('User', () => {
    it('should register with valid credentials', () => {
        browser.url('/create_account');
        const registrationForm = $('#box-create-account');
        registrationForm.$('input[name="firstname"]').setValue('Test-Natali');
        registrationForm.$('input[name="lastname"]').setValue('Test-Natali');
        const countrySelect = registrationForm.$('select[name="country_code"]');
        countrySelect.selectByVisibleText('Ukraine');
        const email = faker.internet.email();
        registrationForm.$('input[name="email"]').setValue(email);
        registrationForm.$('input[name="phone"]').setValue('+380441111111');
        registrationForm.$('input[name="password"]').setValue(email);
        registrationForm.$('input[name="confirmed_password"]').setValue(email);
        registrationForm.$('button[name="create_account"]').click();

        const alert = $('div#notices');
        alert.waitForDisplayed();

        const alertTextExpected = 'Your customer account has been created.';
        const alertText = alert.getText();
        assert(alertText.includes( 'Your customer account has been created.'), `Expected text is ${alertTextExpected} but text is ${alertText}`)
    });
});


