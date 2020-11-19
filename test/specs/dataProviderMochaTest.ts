import * as faker from 'faker';
import * as assert from 'assert';

describe('User', () => {
    let dataCollection = [['Natali', 'Snow'], ['Alex', 'Rain'],['Joe','Blue'], ['Tom','Dark'], ['Diana','White']];

    dataCollection.map(data => {

        it(`should register with valid credentials and ${data} name`, () => {
            browser.url('/create_account');
            const registrationForm = $('#box-create-account');
            registrationForm.$('input[name="firstname"]').setValue(data[0]);
            registrationForm.$('input[name="lastname"]').setValue(data[1]);
            const countrySelect = registrationForm.$('select[name="country_code"]');
            countrySelect.selectByVisibleText('Ukraine');
            const email = faker.internet.email();
            registrationForm.$('input[name="email"]').setValue(email);
            registrationForm.$('input[name="phone"]').setValue('+380441111111');
            registrationForm.$('input[name="password"]').setValue(email);
            registrationForm.$('input[name="confirmed_password"]').setValue(email);
            registrationForm.$('button[name="create_account"]').click();

            browser.pause(10000);
            const alert = $('div#notices');
            assert(alert.isDisplayed(), 'Expected success alert to be visible after registration');
            const alertTextExpected = 'Your customer account has been created.';
            const alertText = alert.getText();
            assert(alertText.includes( 'Your customer account has been created.'), `Expected text is ${alertTextExpected} but text is ${alertText}`)
            browser.reloadSession();
        });
    });
});
