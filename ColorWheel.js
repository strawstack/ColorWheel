class ColorWheel {
    constructor() {
        let _colors = [
            [0, new Color(128, 255, 0)],
            [30, new Color(255, 255, 0)],
            [60, new Color(255, 128, 0)],
            [90, new Color(255, 0, 0)],  // Red
            [120, new Color(255, 0, 128)],
            [150, new Color(255, 0, 255)],
            [180, new Color(128, 0, 255)],
            [210, new Color(0, 0, 255)],  // Blue
            [240, new Color(0, 128, 255)],
            [270, new Color(0, 255, 255)],
            [300, new Color(0, 255, 128)],
            [330, new Color(0, 255, 0)], // Green
            [360, new Color(128, 255, 0)]
        ];
        let _scale = c => {
            // Ensure largest channel is 255 at most
            const m = Math.max(c.r, Math.max(c.g, c.b));
            if (m === 0) return new Color(c.r, c.g, c.b);
            const f = x => Math.floor(x);
            return new Color(
                f(c.r/m * 255),
                f(c.g/m * 255),
                f(c.b/m * 255)
            );
        };
        let _add = (c1, c2) => {
            return new Color(
                c1.r + c2.r,
                c1.g + c2.g,
                c1.b + c2.b
            );
        };
        let all_colors = _colors;
        for (let i = 0; i < 10; i++) {
            let new_colors = [];
            for (let j = 0; j < all_colors.length - 1; j++) {
                let a1 = all_colors[j][0];
                let c1 = all_colors[j][1];
                let a2 = all_colors[j + 1][0];
                let c2 = all_colors[j + 1][1];
                new_colors.push([a1, c1]);
                new_colors.push(
                    [(a1 + a2)/2, _scale(_add(c1, c2))]
                );
            }
            new_colors.push(all_colors[all_colors.length - 1]);
            all_colors = new_colors;
        }
        all_colors.pop(); // Remove duplicate final color
        this.colors = all_colors;
    }

    // Helper methods
    _degToRad(deg) {
        return deg/180 * Math.PI;
    }
    _radToDeg(rad) {
        return rad/Math.PI * 180;
    }
    _scale(c) {
        // Ensure largest channel is 255 at most
        const m = Math.max(c.r, Math.max(c.g, c.b));
        if (m === 0) return new Color(c.r, c.g, c.b);
        const f = x => Math.floor(x);
        return new Color(
            f(c.r/m * 255),
            f(c.g/m * 255),
            f(c.b/m * 255)
        );
    }

    // Public methods
    colorFromAngle(deg) {
        // Return Color given deg
        const _deg = deg % 360;
        if (_deg < 0) _deg += 360;
        for (let color of this.colors) {
            let a = color[0];
            let c = color[1];
            if (a >= _deg) {
                return c;
            }
        }
        return this.colors[this.colors.length - 1][1];
    }
    angleFromColor(color) {
        // Return angle from color on wheel

    }
    getColors(num, deg) {
        // Return 'num' of colors that are evently spaced on the wheel
        // deg is optional start angle, otherwise random
        if (deg === undefined) {
            deg = Math.random() * 360;
        }

        let colors = [];
        if (num === 1) {
            colors.push(this.colorFromAngle(deg));

        } else if(num === 2 || num === 3 || num >= 5) {
            let spacing = 360/num;
            for (let i = 0; i < num; i++) {
                colors.push(this.colorFromAngle(deg + spacing * i));
            }
        } else if (num === 4) {
            let spacing = [0, 120, 180, 300];
            for (let space of spacing) {
                colors.push(
                    this.colorFromAngle(deg + space)
                );
            }
        }
        return colors;
    }
    darken(color, percent) {
        // Reduce values by percent
        let f = x => Math.ceil(x);
        return new Color(
            f(color.r * (1 - percent)),
            f(color.g * (1 - percent)),
            f(color.b * (1 - percent))
        );
    }
    lighten(color, percent) {
        // Increase values by percent
        let f = x => Math.ceil(x);
        let m = Math.max(color.r, Math.max(color.g, color.b));
        return this._scale(new Color(
            f(color.r + m * percent),
            f(color.g + m * percent),
            f(color.b + m * percent)
        ));
    }
}

class Color {
    constructor(hex, g, b) {
        // Hex can be hex color of r component
        if (g === undefined) {
            const rgb = this._hexToRgb(hex);
            this.hex = hex;
            this.r = rgb.r;
            this.g = rgb.g;
            this.b = rgb.b;
        } else {
            this.hex = this._rgbToHex(hex, g, b);
            this.r = hex;
            this.g = g;
            this.b = b;
        }
    }
    // Helper methods
    _hexToRgb(hex) {
        let O = 0;
        if (hex[0] === '#') O = 1;
        const R = 0 + O;
        const G = 2 + O;
        const B = 4 + O;
        let rgb = {};
        rgb.r = parseInt(`${hex[R]}${hex[R+1]}`, 16);
        rgb.g = parseInt(`${hex[G]}${hex[G+1]}`, 16);
        rgb.b = parseInt(`${hex[B]}${hex[B+1]}`, 16);
        return rgb;
    }
    _rgbToHex(r, g, b) {
        let pad = s => {
            if (s.length === 1) {
                return `0${s}`;
            } else {
                return s;
            }
        };
        let hr = pad(r.toString(16));
        let hg = pad(g.toString(16));
        let hb = pad(b.toString(16));
        return `#${hr}${hg}${hb}`;
    }
    toString() {
        return `{hex: ${this.hex}, r: ${this.r}, g: ${this.g}, b: ${this.b}}`;
    }
}

try {
    // Export as module for testing
    // and basic script tag for use
    module.exports = ColorWheel;
} catch(error) {

}
