import * as faker from 'faker';
import json = Mocha.reporters.json;

describe('Wdio', function() {
    it('execute scrip', function () {
        browser.url('/');
        browser.execute(function () {
            console.log('Hello world!');
        });
    });

    it('fill registration form', function() {
        browser.url('/create_account');
        const email = `test${new Date().getTime()/1000}@i.ua`;
        browser.execute(function(_email){
            console.log(`ARGS`, arguments);
            // @ts-ignore
            document.querySelector('input[name=firstname]')['value'] = 'Natali';
            // @ts-ignore
            document.querySelector('input[name=lastname]')['value'] = 'Ly';
            // @ts-ignore
            document.querySelector('select[name=country_code]')['value'] = 'UA';
            // @ts-ignore
            document.querySelector('[name=customer_form] input[name=email]')['click']();
            // @ts-ignore
            // @ts-ignore
            document.querySelector('[name=customer_form] input[name=email]')['value'] = _email;
            // @ts-ignore
            document.querySelector('input[name=phone]')['value'] = '+380971111111';
            // @ts-ignore
            document.querySelector('[name=customer_form] input[name=password]')['value'] = _email;
            // @ts-ignore
            document.querySelector('[name=customer_form] input[name=confirmed_password]')['value'] = _email;
            // @ts-ignore
            document.querySelector('button[name=create_account]')['click']();

        }, email);
        browser.execute(button=> button.click(), $('button[name=create_account]'));
        browser.pause(10000);
    });

    it('fill registration form pass parameters with JSON serialization', function() {
        browser.url('/create_account');

        let returnedUser: any;
        // @ts-ignore
        returnedUser = JSON.parse(browser.execute(function () {
            const id = new Date().getTime() / 1000;
            const email = `test${id}@i.ua`;
            const _user = {
                email: email,
                password: email,
                firstName: `Test First${id}`,
                lastName: `Test Last ${id}`
            };
            // @ts-ignore
            document.querySelector('input[name=firstname]')['value'] = _user.firstName;
            // @ts-ignore
            document.querySelector('input[name=lastname]')['value'] = _user.lastName;
            // @ts-ignore
            document.querySelector('select[name=country_code]')['value'] = 'UA';
            // @ts-ignore
            document.querySelector('[name=customer_form] input[name=email]')['click']();
            // @ts-ignore
            document.querySelector('[name=customer_form] input[name=email]')['value'] = _user.email;
            // @ts-ignore
            document.querySelector('input[name=phone]')['value'] = '+380971111111';
            // @ts-ignore
            document.querySelector('[name=customer_form] input[name=password]')['value'] = _user.password;
            // @ts-ignore
            document.querySelector('[name=customer_form] input[name=confirmed_password]')['value'] = _user.password;
            return JSON.stringify(_user);
        }));
        console.dir(returnedUser);
        browser.execute(button=> button.click(), $('button[name=create_account]'));
        browser.pause(10000);
    });

    it('js click command', function() {
        browser.addCommand('jsClick', function () {
            browser.execute(function (el) {
                el.click()
            }, this)
        }, true);
        $('div').jsClick();
    })
});
