import { createApp } from "vue";
import "./style.css";
import Panel from "./views/Panel.vue";
// import browser from 'webextension-polyfill'

// console.log(browser.runtime)
// const imgUrl = browser.runtime.getURL('/')
// console.log(imgUrl)

/* Startup script to wait until the Miro board becomes available */
const startup = () => {
  if (typeof miro !== "undefined" && miro.board) {
    console.log("Miro board loaded");
    clearInterval(interval);

    main();
  } else {
    console.log("Waiting for Miro initialization...");
  }
};

/* Load PanelButton */
const main = () => {
  const PanelButtonDiv = document.createElement("div");
  document.body.appendChild(PanelButtonDiv);
  createApp(Panel).mount(PanelButtonDiv);
};

const interval = setInterval(startup, 1000);
