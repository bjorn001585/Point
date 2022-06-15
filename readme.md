## Утилита которая упрощает работу с координатами
### Примеры
### `class Point`
```ts
import Point, { Rectangle, MutableRectangle } from ".";
```
#### Method `<Point>.equals`
```ts
var a = new Point(0, 0);
var b = new Point(0, 0);

a.equals(b) // true
```
```ts
var a = new Point(0, 0);
var b = new Point(-1, 0);

a.equals(b) // false
```
#### Method `<Point>.add`
```ts
var a = new Point(10, 100);
var b = new Point(10, 10);

a.add(b) // Point(20, 110)
```
#### Method `<Point>.sub`
```ts
var a = new Point(10, 100);
var b = new Point(10, 10);

a.sub(b) // Point(0, 90)
```
#### Method `<Point>.mult`
```ts
var a = new Point(10, 100);

a.mult(10) // Point(100, 1000)
```
```ts
var a = new Point(-10, -100);

a.mult(5) // Point(-50, -500)
```
#### Method `<Point get>.magnitude`
```ts
var a = new Point(10, 0);

a.magnitude // 10 
```
#### Method `<Point>.distanceTo`
```ts
var a = new Point(-10, 0);
var b = new Point(100, 0);

a.distanceTo(b) // 110
```
#### Method `<Point>.squaredDistanceTo`
```ts
var a = new Point(-10, 0);
var b = new Point(100, 0);

a.squaredDistanceTo(b) // 12100
```
### Примеры
### `class Rectangle`
#### Method `<Rectangle static>.fromPoints`
```ts
var leftTop = new Point(20, 50);
var rightBottom = new Point(300, 600);

var rectangle = Rectangle.fromPoints(leftTop, rightBottom);

console.log(rectangle); // Rectangle(20, 50) 280 x 550
console.log(rectangle.left); // 20
console.log(rectangle.top); // 50
console.log(rectangle.right); // 300
console.log(rectangle.bottom); // 600
```
#### Method `<Rectangle>.equals`
```ts
var leftTop = new Point(20, 50);
var rightBottom = new Point(300, 600);

var rectangle = Rectangle.fromPoints(leftTop, rightBottom);
var rectangle1 = new Rectangle(1560, 50, 240, 230);

rectangle.equals(rectangle1) // false
```
#### Method `<Rectangle>.intersection`
```ts
var leftTop = new Point(20, 50);
var rightBottom = new Point(300, 600);

var rectangle = Rectangle.fromPoints(leftTop, rightBottom);
var rectangle1 = new Rectangle(1560, 50, 240, 230);

rectangle.intersection(rectangle1) // null
```
```ts
var leftTop = new Point(20, 50);
var rightBottom = new Point(300, 600);

var rectangle = Rectangle.fromPoints(leftTop, rightBottom);
var rectangle1 = new Rectangle(160, 50, 240, 230);

rectangle.intersection(rectangle1) // Rectangle(160, 300) 140 x 550
```
#### Method `<Rectangle>.intersects`
```ts
var leftTop = new Point(20, 50);
var rightBottom = new Point(300, 600);

var rectangle = Rectangle.fromPoints(leftTop, rightBottom);
var rectangle1 = new Rectangle(1560, 50, 240, 230);

rectangle.intersects(rectangle1) // false
```
```ts
var leftTop = new Point(20, 50);
var rightBottom = new Point(300, 600);

var rectangle = Rectangle.fromPoints(leftTop, rightBottom);
var rectangle1 = new Rectangle(160, 50, 240, 230);

rectangle.intersects(rectangle1) // true
```
#### Method `<Rectangle>.boundingBox`
```ts
var leftTop = new Point(20, 50);
var rightBottom = new Point(300, 600);

var rectangle = Rectangle.fromPoints(leftTop, rightBottom);
var rectangle1 = new Rectangle(1560, 50, 240, 230);

rectangle.boundingBox(rectangle1) // Rectangle(20, 50) 1780 x 550
```
#### Method `<Rectangle>.containsRectangle`
```ts
var leftTop = new Point(20, 50);
var rightBottom = new Point(300, 600);

var rectangle = Rectangle.fromPoints(leftTop, rightBottom);
var rectangle1 = new Rectangle(1560, 50, 240, 230);

rectangle.containsRectangle(rectangle1) // false
```
```ts
var leftTop = new Point(20, 50);
var rightBottom = new Point(300, 600);

var rectangle = Rectangle.fromPoints(leftTop, rightBottom);
var rectangle1 = new Rectangle(20, 520, 20, 20);

rectangle.containsRectangle(rectangle1) // true
```
#### Method `<Rectangle>.containsPoint`
```ts
var leftTop = new Point(20, 50);
var rightBottom = new Point(300, 600);

var rectangle = Rectangle.fromPoints(leftTop, rightBottom);

rectangle.containsPoint(new Point(40, 15)) // false
```
```ts
var leftTop = new Point(20, 50);
var rightBottom = new Point(300, 600);

var rectangle = Rectangle.fromPoints(leftTop, rightBottom);

rectangle.containsPoint(new Point(40, 159)) // true
```
### Примеры
### `class MutableRectangle`
> Может тоже самое что и `Rectangle` но, в ходе использования можно изменить `width` и `height`
```ts
var rectangle = new MutableRectangle(20, 50, 300, 600);
console.log(rectangle); // Rectangle(20, 50) 300 x 600
console.log(rectangle.left); // 20
console.log(rectangle.top); // 50
console.log(rectangle.right); // 320
console.log(rectangle.bottom); // 650

rectangle.width = 200;
rectangle.height = 100;

console.log(rectangle); // Rectangle(20, 50) 200 x 100
console.log(rectangle.left); // 20
console.log(rectangle.top); // 50
console.log(rectangle.right); // 220
console.log(rectangle.bottom); // 150
```
