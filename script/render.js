import { Clock } from "./clock.js";

export function render() {
    document.documentElement.style.setProperty("--backgroundColor", Clock.backgroundColor);
    document.documentElement.style.setProperty("--textColor", Clock.textColor);
    document.documentElement.style.setProperty("--shadowColor", Clock.textColor + "7F");

    const clock = document.getElementById("clock");
    clock.innerText = (() => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${hours < 10 ? "0" + hours.toString() : hours}:${minutes < 10 ? "0" + minutes.toString() : minutes}:${seconds < 10 ? "0" + seconds.toString() : seconds}`;
    })();

    const switchButton = document.getElementById("switch");
    if (Clock.isDay) {
        (/** @type {HTMLDivElement} */switchButton.children[0]).hidden = false;
        (/** @type {HTMLDivElement} */switchButton.children[1]).hidden = true;
    }
    else {
        (/** @type {HTMLDivElement} */switchButton.children[1]).hidden = false;
        (/** @type {HTMLDivElement} */switchButton.children[0]).hidden = true;
    }
}

/**
 * 
 * @param { string } color 
 */
export function parseColor(color) {
    /**
     * @param { string } cause 
     */
    function abort(cause) {
        throw Error("invalid color: " + cause);
    }

    if (typeof(color) != "string") abort("not a string");
    if (color.length == 6) {
        for (const digit of color) {
            if ("0123456789abcdefgABCDEFG".indexOf(digit) == -1) {
                abort("digit out of range");
            }   
        }
        return "#" + color;
    } else if (color.length == 7) {
        if (color[0] != "#") abort("doesn't start with #");
        return parseColor(color.slice(1));
    } else {
        abort("bad length");
    }
}