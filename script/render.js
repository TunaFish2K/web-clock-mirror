import { Clock } from "./clock.js";

export function render() {
    document.body.style.background = Clock.backgroundColor;
    
    const clock = document.getElementById("clock");
    clock.style.color = Clock.textColor;
    clock.innerText = (() => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${hours < 10 ? "0" + hours.toString() : hours}:${minutes < 10 ? "0" + minutes.toString() : minutes}:${seconds < 10 ? "0" + seconds.toString() : seconds}`;
    })();

    const switchButton = document.getElementById("switch");
    if (Clock.isDay) switchButton.children[0].src = "/resources/images/day.svg";
    else switchButton.children[0].src = "/resources/images/night.svg";
}