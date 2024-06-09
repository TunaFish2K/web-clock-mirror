import { parseColor } from "./render.js";

/**
 * @enum { number }
 * @readonly
 */
export const Mode = {
    LIGHT: 0,
    DARK: 1,
    CUSTOM: 2
}

export class Clock {
    /**
     * @type { string }
     */
    textColor="#000000";
    /**
     * @type { string }
     */
    backgroundColor="#FFFFFF";

    /**
     * @type { boolean }
     */
    static get isDay() {
        return this.backgroundColor != "#000000";
    }

    /**
     * @type { Mode }
     */
    static get mode() {
        if (this.backgroundColor == "#FFFFFF" &&
            this.textColor == "#000000") return Mode.LIGHT;
        if (this.backgroundColor == "#000000" &&
            this.textColor == "#FFFFFF") return Mode.DARK;
        return Mode.CUSTOM; 
    }

    static _switch() {
        if (this.mode == Mode.LIGHT) this.dark();
        else this.light();
    }

    static lastDropCustom = 0;
    static dropCustomCount = 0;

    static switch() {
        if (this.mode == Mode.CUSTOM) {
            const current = Date.now();
            const interval = current - this.lastDropCustom;
            if (interval > 1000) {
                this.dropCustomCount = 1;
            } else {
                this.dropCustomCount++;
                if (this.dropCustomCount >= 5) {
                    this.light();
                    this.dropCustomCount = 0;
                }
            } this.lastDropCustom = current;

            return;
        }
        this._switch();
    }

    static dark() {
        this.backgroundColor = "#000000";
        this.textColor = "#FFFFFF";    
    }

    static light() {
        this.backgroundColor = "#FFFFFF";
        this.textColor = "#000000";
    }

    static save() {
        localStorage.setItem("clock", JSON.stringify({
            backgroundColor: this.backgroundColor,
            textColor: this.textColor
        }));
    }

    static load() {
        let data = localStorage.getItem("clock");
        if (!data) return this.light();

        try {
            data = JSON.parse(data);
            parseColor(data["backgroundColor"]);
            parseColor(data["textColor"]);
            Object.assign(this, data);
        } catch(e) {
            this.light();
        }
        
    }
}