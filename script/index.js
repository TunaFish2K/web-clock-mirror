// @ts-check

import { Clock } from "./clock.js";
import { localize } from "./localization.js"
import { render } from "./render.js";
import { loadAll as loadALlResources } from "./resource.js";

window.addEventListener("load", async () => {
    await loadALlResources();

    globalThis.Clock = Clock;
    Clock.load();

    localize(navigator.language.toLowerCase());

    setInterval(render, 200);
});

window.onbeforeunload = () => {
    Clock.save();
};