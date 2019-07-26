import { ILoginPage } from "./login.interface";
import {
  setElement,
  elemClick,
  setValues,
  waitUntillLoaded,
  waitUntillEnabled,
  checkValues
} from "../../../actions";
import { promise as wdpromise } from "selenium-webdriver";
import { browser, element, by } from "protractor";
import { ILocRef, LocationTypes } from "../../../action.interface";

export const loginPageIds: ILoginPage<ILocRef> = {
  username: { type: LocationTypes.Xpath, value: '//*[@id="username"]' },
  password: { type: LocationTypes.Id, value: "password" },
  submit: { type: LocationTypes.Class, value: "submit" }
};

export const loginPageValues: ILoginPage<string> = {
  username: "abc",
  password: "pass"
};

export const loginPageCheckValues: ILoginPage<string> = {
  username: "abc11",
  password: "pass"
};

export class LoginPage {
  login(): wdpromise.Promise<any> {
    return setValues(loginPageIds, loginPageValues)
      .then(() => {
        browser.sleep(4000);
      })
      .then(() => {
        return checkValues(loginPageIds, loginPageCheckValues);
      })
      .then(() => {
        return waitUntillEnabled(loginPageIds.submit);
      })
      .then(() => {
        return elemClick(loginPageIds.submit);
      })
      .then(() => {
        return browser.sleep(4000);
      });
  }

  public gotoPage() {
    browser.ignoreSynchronization = true;
    return browser.get(browser.baseUrl);
  }

  loginForProtractor(): wdpromise.Promise<any> {
    return this.gotoPage()
      .then(() => {
        return waitUntillLoaded(loginPageIds.username);
      })
      .then(() => browser.sleep(5000))
      .then(() => {
        return this.login();
      });
  }
}
