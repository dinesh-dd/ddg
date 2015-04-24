describe('Login test', function() {
  var loginLink = element(by.css('[ng-click="modal(\'login\')"]'));
  var emailFld = element(by.model('u.email'));
  var passwordFld = element(by.model('u.password'));
  var loginSubmit = element(by.css('[type="submit"]'));
  var signupLink = element(by.css('[ng-click="gotoSignUp()"]'));
  var facebookLink = element(by.css('[ng-click="tryFbLogin()"]'));
  var response = element(by.id('response'));
  var password = '12345678aA';
  var email = 'dinesh@complitech.net';
  var wrongEmail = 'dinesh78787878787@complitech.net'

  beforeEach(function() {
    browser.get(browser.baseUrl);
    loginLink.click();  
  });

  it('Work login with facebook',function(){
      facebookLink.click();
  });
  it('login should fail with the wrong data',function(){
      emailFld.sendKeys(wrongEmail);
      passwordFld.sendKeys(password);
      loginSubmit.click();
      expect(element(by.css('[ng-switch-when="error"]')).isDisplayed()).toBeTruthy();
  });
  it('login should success with right data',function(){
      emailFld.sendKeys(email);
      passwordFld.sendKeys(password);
      loginSubmit.click();
      expect(element(by.css('[ng-show="user.userLogedIn"].nav')).isDisplayed()).toBeTruthy();
  });
  it('sign up link should work in login page',function(){
      signupLink.click();
  });

  // it('should throw error if wrong details',function(){
  // 	expect(true).toEqual(true);
  // });
  // it('should login with the login detail', function() {
  //   expect(true).toEqual(true);
  // });
  // it('should goto sign up ',function(){
  // 	expect(true).toEqual(true);
  // });
  // it('should close the login popup',function(){
  // 	expect(true).toEqual(true);
  // });
  // it('should login with facebook',function(){
  // 	expect(true).toEqual(true);
  // });
});