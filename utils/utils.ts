import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';
import * as faker from 'faker';


export function createNewUserAndLogin() {
    const credentials = createNewUser();
    return  quickLogin(credentials);
}

export function createNewUser():any {
    return browser.call(createNewUserAsync)
}

async function createNewUserAsync() {
    const j = request.jar();
    let req = request.defaults({
        jar: j,
        resolveWithFullResponse: true,
        headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    let tokenResponse = await req.get('http://ip-5236.sunline.net.ua:38015/create_account');
    const $ = cheerio.load(tokenResponse.body);
    const token = $('input[name="token"]').attr('value');
    const email = faker.internet.email();
    const password = email;
    const formData = {token,
        company: null,
        tax_id: null,
        firstname: "Nata",
        lastname: "Ly",
        address1: null,
        address2: null,
        postcode: null,
        city: null,
        country_code: "US",
        zone_code: "AL",
        email,
        phone: null,
        password,
        confirmed_password: 12,
        newsletter: 1,
        create_account: "Create Account"};
    try {
        await req.post('http://ip-5236.sunline.net.ua:38015/create_account', {form: formData})
    }
    catch(err) {
        console.log(err)
    }

    return {email, password}
}

export function quickLogin(credentials: {email:string, password:string}){

    const cookieWithSessionId: any = browser.call(function(){
        return quickLoginAsync(credentials)
    });
    browser.url('/');
    browser.setCookies({
        name: cookieWithSessionId.key,
        value: cookieWithSessionId.value
    });
    browser.refresh();
    return {credentials, cookieWithSessionId}
}

async function quickLoginAsync(credentials: { email: any; password: any; }) {
    const j = request.jar();
    let req = request.defaults({
        jar: j,
        resolveWithFullResponse: true,
        headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    let tokenResponse = await req.get('http://ip-5236.sunline.net.ua:38015/create_account');
    const $ = cheerio.load(tokenResponse.body);
    const token = $('input[name="token"]').attr('value');
    const formData = {token,
        redirect_url: null,
        email:credentials.email,
        password: credentials.password,
        login: "Sign In"};

        await req.post('http://ip-5236.sunline.net.ua:38015/login', {form: formData,
        jar: j,
            resolveWithFullResponse: true,
            headers: {
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(null, err=>{});

        const cookies = j.getCookies('http://ip-5236.sunline.net.ua:38015');
        return cookies.find(cookie=>cookie['key'] == 'LCSESSID')
}
