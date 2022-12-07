class Point {
    constructor(x, y) {
        return {
            x: x || 0,
            y: y || 0,
            equal(other) {
                return this.x === other.x && this.y === other.y;
            },
            add(other) {
                return Point(this.x + other.x, this.y + other.y);
            },
            subtract(other) {
                return Point(this.x - other.x, this.y - other.y);
            },
            scale(scalar) {
                return Point(this.x * scalar, this.y * scalar);
            },
            magnitude() {
                return Point.distance(Point(0, 0), this);
            }
        };
    }

    distance({x1, y1}, {x2, y2}) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    /**
     * If you have two dudes, one standing at point p1, and the other
     * standing at point p2, then this method will return the direction
     * that the dude standing at p1 will need to face to look at p2.
     * @param {Point} p1 The starting point.
     * @param {Point} p2 The ending point.
     * @returns The direction from p1 to p2 in radians.
     */
    direction({x1, y1}, {x2, y2}) {
        return Math.atan2(
            y2 - y1,
            x2 - x1
        );
    }
}

export default Point;
