import {
    Given,
    When,
    Then,
    Before,
    After,
  } from "@badeball/cypress-cucumber-preprocessor";
  import { faker } from "@faker-js/faker";
  import ProfilePage from "../pages/perfil.page";
  import LoginPage from "../pages/login.page";
  
  const accountPage = new AccountPage();
  const profilePage = new ProfilePage();
  const loginPage = new LoginPage();