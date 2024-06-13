import {
    Given,
    When,
    Then,
    Before,
    After
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import LoginPage from "../pages/login.page";
import ProfilePage from "../pages/perfil.page";

const loginPage = new LoginPage();
const perfilPage = new ProfilePage();