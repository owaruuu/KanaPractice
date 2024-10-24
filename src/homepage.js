import { CreateStackedButton } from "./helpers.js";
import { state } from "./state.js";
import { instrucciones, bigButtonExplanations } from "./data.js";
import { CreateComplex, CreateAndClass } from "./domHelpers.js";
import { BuildLearnSetupPage } from "./learnSetupPage.js";

export function BuildHomePage() {
    //popular instrucciones
    document.getElementById("instruccionescontent").textContent =
        instrucciones.home;

    //Build both buttons
    //Get app element
    let appDiv = document.getElementById("app");

    //Create desktop buttons container
    let desktopButtonsContainer = CreateComplex(
        "div",
        appDiv,
        "desktop-section-button-container",
        [],
        null
    );

    //Create mobile buttons container
    let mobileButtonContainer = CreateComplex(
        "div",
        appDiv,
        "mobile-section-button-container",
        [],
        null
    );

    //Create desktop buttons
    let desktopButtonLearn = CreateDesktopButton(
        "Aprender",
        bigButtonExplanations.learn,
        desktopButtonsContainer
    );

    let desktopButtonPractice = CreateDesktopButton(
        "Practicar",
        bigButtonExplanations.practice,
        desktopButtonsContainer
    );

    //Create mobile buttons
    let buttonAprender = CreateStackedButton(mobileButtonContainer, "Aprender");
    let buttonPractica = CreateStackedButton(
        mobileButtonContainer,
        "Practicar"
    );

    //Add click events
    desktopButtonLearn.addEventListener("click", OnLearnButtonPress);
    desktopButtonPractice.addEventListener("click", OnPracticeButtonPress);

    buttonAprender.addEventListener("click", OnLearnButtonPress);
    buttonPractica.addEventListener("click", OnPracticeButtonPress);
}

//Helper functions
function CreateDesktopButton(cardTitle, explanationText, parent) {
    let button = CreateAndClass("button", parent, ["desktopButton"]);

    let card = CreateAndClass("div", button, ["homepage-card"]);

    CreateComplex("h2", card, null, ["homepage-card-title"], cardTitle);

    let img = CreateAndClass("img", card, ["homepage-img"]);

    let imgFile = "";

    switch (cardTitle) {
        case "Aprender":
            imgFile = "../images/LearnButtonImg3.png";
            break;
        case "Practicar":
            imgFile = "../images/PracticeButtonImg1.png";
            break;
    }

    img.setAttribute("src", imgFile);
    img.setAttribute("alt", `Imagenes de la seccion ${cardTitle}`);

    CreateComplex("p", card, null, ["homepage-card-footer"], explanationText);

    return button;
}

//Callbacks

/**
 * Cambia la pantalla a la seleccion de kanas para la seccion de aprendizaje
 */
function OnLearnButtonPress() {
    // state.currentPage = "learnSetup";
    // window.history.pushState(state, null, "");

    // setTimeout(BuildLearnSetupPage, 200);
    ChangeScreen("home", BuildLearnSetupPage);
}

function OnPracticeButtonPress() {
    // state.currentPage = "practiceSetup";
    // window.history.pushState(state, null, "");

    // setTimeout(BuildPracticeSetupPage, 200);
    ChangeScreen("home", BuildPracticeSetupPage);
}

// TODO - mover funcion a helpers ?
/**
 * Hace todo lo necesario para cambiar de pantalla y crear un nuevo state en el browser history
 * @var {string} currentPage - la pantalla desde la cual me estoy moviendo
 * @var {function} pageCallback - la funcion que se ejecuta para cambiar de pantalla
 * @returns {void} - no devuelve nada, solo cambia la pantalla
 */
function ChangeScreen(currentPage, pageCallback) {
    // Crear nueva state
    state.currentPage = currentPage;
    window.history.pushState(state, null, "");

    // Cambiar de pantalla
    setTimeout(pageCallback, 200);
}
