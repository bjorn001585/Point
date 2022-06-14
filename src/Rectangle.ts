import Point from "..";
import BaseRectangle from "./BaseRectangle";

/**
 * A class for representing two-dimensional rectangles whose properties are
 * immutable.
 */
export class Rectangle extends BaseRectangle {
    /**
     * Create a rectangle spanned by `(left, top)` and
     * `(left+width, top+height)`.
     *
     * The rectangle contains the points
     * with x-coordinate between `left` and `left + width`, and
     * with y-coordinate between `top` and `top + height`, both inclusive.
     *
     * The `width` and `height` should be non-negative.
     * If `width` or `height` are negative, they are clamped to zero.
     *
     * If `width` and `height` are zero, the "rectangle" comprises only the
     * single point `(left, top)`.
     *
     * Example:
     * ```ts
     * var rectangle = new Rectangle(20, 50, 300, 600);
     * console.log(rectangle.left); // 20
     * console.log(rectangle.top); // 50
     * console.log(rectangle.right); // 320
     * console.log(rectangle.bottom); // 650
     * ```
     */
    constructor(
        public left: number,
        public top: number,
        public readonly width: number,
        public readonly height: number
    ) {
        super();

        this._width = (width < 0) ? (width == -Infinity ? 0 : -width * 0) : width + 0
        this._height = (height < 0) ? (height == -Infinity ? 0 : -height * 0) : height + 0 
    }

    /**
     * Create a rectangle spanned by the points [a] and [b];
     *
     * The rectangle contains the points
     * with x-coordinate between `a.x` and `b.x`, and
     * with y-coordinate between `a.y` and `b.y`, both inclusive.
     *
     * If the distance between `a.x` and `b.x` is not representable
     * (which can happen if one or both is a double),
     * the actual right edge might be slightly off from `max(a.x, b.x)`.
     * Similar for the y-coordinates and the bottom edge.
     *
     * Example:
     * ```ts
     * var leftTop = new Point(20, 50);
     * var rightBottom = new Point(300, 600);
     *
     * var rectangle = Rectangle.fromPoints(leftTop, rightBottom);
     * console.log(rectangle); // Rectangle(20, 50) 280 x 550
     * console.log(rectangle.left); // 20
     * console.log(rectangle.top); // 50
     * console.log(rectangle.right); // 300
     * console.log(rectangle.bottom); // 600
     * ```
     */
    static fromPoints(a: Point, b: Point) {
        let left = Math.min(a.x, b.x);
        let width = Math.max(a.x, b.x) - left;

        let top = Math.min(a.y, b.y);
        let height = Math.max(a.y, b.y) - top

        return new this(left, top, width, height);
    }
}