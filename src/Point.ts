import util, { InspectOptionsStylized } from "util";

/**
 * A class for representing two-dimensional positions.
 * 
 * Example:
 * ```ts
 * var leftTop = new Point(0, 0);
 * var rightBottom = new Point(200, 400);
 * ```
 */
export default class Point {
    /**
     * Creates a point with the provided [x] and [y] coordinates.
     */
    constructor(
        public x: number,
        public y: number
    ) {
        if(typeof x != 'number' || typeof y != 'number')
            throw new Error("A number is required")
    }

    /**
     * Whether [other] is a point with the same coordinates as this point.
     * 
     * Returns `true` if [other] is a [Point] with [x] and [y]
     * coordinates equal to the corresponding coordinates of this point,
     * and `false` otherwise.
     * 
     * Example 1:
     * ```ts
     * var a = new Point(0, 0);
     * var b = new Point(0, 0);
     * 
     * a.equals(b) // true
     * ```
     * Example 2:
     * ```ts
     * var a = new Point(1, 0);
     * var b = new Point(-1, 0);
     * 
     * a.equals(b) // false
     * ```
     */
    public equals(other: Point): boolean {
        if(!(other instanceof Point)) throw new Error("A Point instance is required");

        return this.x === other.x && this.y === other.y
    }

    /**
     * Add [other] to `this`, as if both points were vectors.
     * 
     * Returns the resulting "vector" as a Point.
     * 
     * Example:
     * ```ts
     * var a = new Point(10, 100);
     * var b = new Point(10, 10);
     * 
     * a.add(b) // Point(20, 110)
     * ```
     */
    public add(other: Point): Point {
        if(!(other instanceof Point)) throw new Error("A Point instance is required");

        return new Point(this.x + other.x, this.y + other.y)
    }

    /**
     * Subtract [other] from `this`, as if both points were vectors.
     * 
     * Returns the resulting "vector" as a Point.
     * 
     * Example:
     * ```ts
     * var a = new Point(10, 100);
     * var b = new Point(10, 10);
     * 
     * a.sub(b) // Point(0, 90)
     * ```
     */
    public sub(other: Point): Point {
        if(!(other instanceof Point)) throw new Error("A Point instance is required");

        return new Point(this.x - other.x, this.y - other.y)
    }

    /**
     * Scale this point by [factor] as if it were a vector.
     * 
     * **Important Note**: This function accepts a `num` as its argument only so
     * that you can scale `Point<float>` objects by an `int` factor. Because the
     * `*` operator always returns the same type of `Point` as it is called on,
     * passing in a float [factor] on a `Point<int>`.
     * 
     * Example 1:
     * ```ts
     * var a = new Point(10, 100);
     * 
     * a.milt(10) // Point(100, 1000)
     * ```
     * Example 2:
     * ```ts
     * var a = new Point(-10, -100);
     * 
     * a.milt(5) // Point(-50, -500)
     * ```
     */
    public mult(other: number): Point {
        if(typeof other != 'number') throw new Error("A number is required")

        return new Point(this.x * other, this.y * other)
    }

    /**
     * Get the straight line (Euclidean) distance between the origin (0, 0) and
     * this point.
     * 
     * Example:
     * ```ts
     * new Point(0, 0).magnitude; // 0
     * new Point(10, 0).magnitude;  // 10
     * new Point(0, -10).magnitude; // 10
     * new Point(10, 10).magnitude;  // 14.142135623730951
     * ```
     */
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Returns the distance between `this` and [other].
     * 
     * Example 1:
     * ```ts
     * var a = new Point(0, 0);
     * var b = new Point(10, 0);
     * 
     * a.distanceTo(b) // 10
     * ```
     * 
     * Example 2:
     * ```ts
     * var a = new Point(-10, 0);
     * var b = new Point(100, 0);
     * 
     * a.distanceTo(b) // 110
     * ```
     */
    public distanceTo(other: Point) {
        if(!(other instanceof Point)) throw new Error("A Point instance is required");

        let distance = this.squaredDistanceTo(other);

        return Math.sqrt(distance)
    }

    /**
     * Returns the squared distance between `this` and [other].
     * 
     * Squared distances can be used for comparisons when the actual value is not
     * required.
     * 
     * Example 1:
     * ```ts
     * var a = new Point(0, 0);
     * var b = new Point(10, 0);
     * 
     * a.squaredDistanceTo(b) // 100
     * ```
     * Example 2:
     * ```ts
     * var a = new Point(-10, 0);
     * var b = new Point(100, 0);
     * 
     * a.squaredDistanceTo(b) // 12100
     * ```
     */
    public squaredDistanceTo(other: Point) {
        if(!(other instanceof Point)) throw new Error("A Point instance is required");

        let dx = this.x - other.x;
        let dy = this.y - other.y;

        return dx * dx + dy * dy
    }

    [Symbol.for("nodejs.util.inspect.custom")](_: number, style: InspectOptionsStylized) {
        let x = util.inspect(this.x, style)
        let y = util.inspect(this.y, style)

        return `Point(${x}, ${y})`
    }
}