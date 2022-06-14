import util, { InspectOptionsStylized } from "util";
import Point, { Rectangle } from ".."

export default abstract class BaseRectangle {
    /** The x-coordinate of the left edge. */
    public left: number = 0;

    /** The y-coordinate of the top edge. */
    public top: number = 0;

    /** The width of the rectangle. */
    protected _width: number = 0;

    /** The height of the rectangle. */
    protected _height: number = 0;

    /** The x-coordinate of the right edge. */
    public get right() {
        return this.left + this._width
    }

    /** The y-coordinate of the bottom edge. */
    public get bottom() {
        return this.top + this._height
    }

    public equals(other: BaseRectangle) {
        if(other instanceof BaseRectangle && 
            this.left == other.left &&
            this.top == other.top &&
            this.right == other.right &&
            this.bottom == other.bottom) return true

        return false
    }

    /**
     * Computes the intersection of `this` and [other].
     *
     * The intersection of two axis-aligned rectangles, if any, is always another
     * axis-aligned rectangle.
     *
     * Returns the intersection of this and `other`, or `null` if they don't
     * intersect.
     */
    public intersection(other: Rectangle) {
        let x0 = Math.max(this.left, other.left);
        let x1 = Math.min(this.left + this._width, other.left + this._width);

        if(x0 <= x1) {
            let y0 = Math.max(this.top, other.top);
            let y1 = Math.max(this.top + this._height, other.top + other.height);

            if(y0 <= y1) {
                return new Rectangle(x0, x1, x1 - x0, y1 - y0);
            }
        }

        return null;
    }

    /** Returns true if `this` intersects [other]. */
    public intersects(other: Rectangle) {
        return (this.left <= other.left + other.width &&
            other.left <= this.left + this._width &&
            this.top <= other.top + other.height &&
            other.top <= this.top + this._height);
    }

    /** Returns a new rectangle which completely contains `this` and [other]. */
    public boundingBox(other: Rectangle) {
        var right = Math.max(this.left + this._width, other.left + other.width);
        var bottom = Math.max(this.top + this._height, other.top + other.height);
    
        var left = Math.min(this.left, other.left);
        var top = Math.min(this.top, other.top);

        return new Rectangle(left, top, right - left, bottom - top)
    }

    /** Tests whether `this` entirely contains [another]. */
    public containsRectangle(another: Rectangle) {
        return this.left <= another.left &&
            this.left + this._width >= another.left + another.width &&
            this.top <= another.top &&
            this.top + this._height >= another.top + another.height;
    }

    /** Tests whether [another] is inside or along the edges of `this`. */
    public containsPoint(another: Point) {
        return another.x >= this.left &&
            another.x <= this.left + this._width &&
            another.y >= this.top &&
            another.y <= this.top + this._height;
    }

    get topLeft() {
        return new Point(this.left, this.top);
    }

    get topRight() {
        return new Point(this.left + this._width, this.top)
    }

    get bottomRight() {
        return new Point(this.left + this._width, this.top + this._height);
    }

    get bottomLeft() {
        return new Point(this.left, this.top + this._height);
    }

    [Symbol.for("nodejs.util.inspect.custom")](_: number, style: InspectOptionsStylized) {
        let left = util.inspect(this.left, style)
        let top = util.inspect(this.top, style)

        let width = util.inspect(this._width, style)
        let height = util.inspect(this._height, style)

        return `Rectangle(${left}, ${top}) ${width} x ${height}`
    }
}