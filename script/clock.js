export class Clock {
    /**
     * @type { string }
     */
    textColor;
    /**
     * @type { string }
     */
    backgroundColor;

    /**
     * @type { boolean }
     */
    static get isDay() {
        return this.backgroundColor != "#000000";
    }

    static switch() {
        if (this.isDay) this.dark();
        else this.light();
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
        const data = localStorage.getItem("clock");
        if (!data) return this.light();

        try {
            Object.assign(this, JSON.parse(data));
        } catch(e) {
            console.error(e);
            this.light();
        }
        
    }
}