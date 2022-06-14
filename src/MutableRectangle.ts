import BaseRectangle from "./BaseRectangle";
import Point from "./Point";
import { Rectangle } from "./Rectangle";

export function clampToZero(value: number) {
    return value == -Infinity ? 0 : -value
}

/**
 * A class for representing two-dimensional axis-aligned rectangles with
 * mutable properties.
 */
export class MutableRectangle extends BaseRectangle implements Rectangle {
    /**
     * Create a mutable rectangle spanned by `(left, top)` and
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
     * var rectangle = new MutableRectangle(20, 50, 300, 600);
     * console.log(rectangle); // Rectangle(20, 50) 300 x 600
     * console.log(rectangle.left); // 20
     * console.log(rectangle.top); // 50
     * console.log(rectangle.right); // 320
     * console.log(rectangle.bottom); // 650
     *
     * // Change rectangle width and height.
     * rectangle.width = 200;
     * rectangle.height = 100;
     *
     * console.log(rectangle); // Rectangle(20, 50) 200 x 100
     * console.log(rectangle.left); // 20
     * console.log(rectangle.top); // 50
     * console.log(rectangle.right); // 220
     * console.log(rectangle.bottom); // 150
     * ```
     */
    constructor(
        /**
         * The x-coordinate of the left edge.
         * Setting the value will move the rectangle without changing its width.
         */
        public left: number,
        /**
         * The y-coordinate of the left edge.
         * Setting the value will move the rectangle without changing its height..
         */
        public top: number,
        width: number,
        height: number
    ) {
        super();

        this._width = (width < 0) ? clampToZero(width) : width + 0;
        this._height = (height < 0) ? clampToZero(height) : height + 0;
    }

    /**
     * Create a mutable rectangle spanned by the points [a] and [b];
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
     * var rectangle = MutableRectangle.fromPoints(leftTop, rightBottom);
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
        let height = Math.max(a.y, b.y) - top;

        return new this(left, top, width, height);
    }

    get width() {
        return this._width;
    }

    /**
     * Sets the width of the rectangle.
     *
     * The width must be non-negative.
     * If a negative width is supplied, it is clamped to zero.
     *
     * Setting the value will change the right edge of the rectangle,
     * but will not change [left].
     */
    set width(value) {
        if(value < 0) value = clampToZero(value);
        this._width = value
    }

    get height() {
        return this._height;
    }

    /**
     * Sets the height of the rectangle.
     *
     * The height must be non-negative.
     * If a negative height is supplied, it is clamped to zero.
     *
     * Setting the value will change the bottom edge of the rectangle,
     * but will not change [top].
     */
    set height(value) {
        if(value < 0) value = clampToZero(value);
        this._height = value
    }
}