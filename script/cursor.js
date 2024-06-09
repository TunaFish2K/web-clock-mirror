function hide() {
    for (const element of document.getElementsByTagName("*")) {
        document.body.classList.add(["hideCursor"]);
        for (const id of [
            "switch", "repository", "settings", "openSettings"
        ]) {
            document.getElementById(id).classList.add(["hideCursor"]);
        }
    }
}

function show () {
    document.body.classList.remove(["hideCursor"]);
    for (const id of [
        "switch", "repository", "settings", "openSettings"
    ]) {
        document.getElementById(id).classList.remove(["hideCursor"]);
    }
}

export function start() {
    /**
     * @type { number }
     */
    let timerId;
    hide();

    window.addEventListener("mousemove", () => {
        show();

        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(hide, 1000);
    });
}