class Matrix {
    constructor(a = 1, b, c, d = 1, tx, ty) {
        return {
            a,
            b: b || 0,
            c: c || 0,
            d,
            tx: tx || 0,
            ty: ty || 0,
            concat(matrix) {
                return Matrix(
                    this.a * matrix.a + this.c * matrix.b,
                    this.b * matrix.a + this.d * matrix.b,
                    this.a * matrix.c + this.c * matrix.d,
                    this.b * matrix.c + this.d * matrix.d,
                    this.a * matrix.tx + this.c * matrix.ty + this.tx,
                    this.b * matrix.tx + this.d * matrix.ty + this.ty
                );
            },
            deltaTransformPoint({x, y}) {
                return Point(
                    this.a * x + this.c * y,
                    this.b * x + this.d * y
                );
            },
            inverse() {
                const determinant = this.a * this.d - this.b * this.c;
                return Matrix(
                    this.d / determinant,
                    -this.b / determinant,
                    -this.c / determinant,
                    this.a / determinant,
                    (this.c * this.ty - this.d * this.tx) / determinant,
                    (this.b * this.tx - this.a * this.ty) / determinant
                );
            },
            rotate(theta, aboutPoint) {
                return this.concat(Matrix.rotation(theta, aboutPoint));
            },
            scale(sx, sy, aboutPoint) {
                return this.concat(Matrix.scale(sx, sy, aboutPoint));
            },
            transformPoint({x, y}) {
                return Point(
                    this.a * x + this.c * y + this.tx,
                    this.b * x + this.d * y + this.ty
                );
            },
            translate(tx, ty) {
                return this.concat(Matrix.translation(tx, ty));
            }
        };
    }
    rotation(theta, aboutPoint) {
        let rotationMatrix = Matrix(
            Math.cos(theta),
            Math.sin(theta),
            -Math.sin(theta),
            Math.cos(theta)
        );

        if(aboutPoint) {
            rotationMatrix =
                Matrix.translation(aboutPoint.x, aboutPoint.y).concat(
                    rotationMatrix
                ).concat(
                    Matrix.translation(-aboutPoint.x, -aboutPoint.y)
                );
        }

        return rotationMatrix;
    }
    scale(sx, sy = sx, aboutPoint) {
        let scaleMatrix = Matrix(sx, 0, 0, sy);

        if(aboutPoint) {
            scaleMatrix =
                Matrix.translation(aboutPoint.x, aboutPoint.y).concat(
                    scaleMatrix
                ).concat(
                    Matrix.translation(-aboutPoint.x, -aboutPoint.y)
                );
        }

        return scaleMatrix;
    }
    translation(tx, ty) {
        return Matrix(1, 0, 0, 1, tx, ty);
    }
    IDENTITY() {
        return Matrix();
    }
    VERTICAL_FLIP() {
        return Matrix(1, 0, 0, -1);
    }
    HORIZONTAL_FLIP() {
        return Matrix(-1, 0, 0, 1);
    }
}
export default Matrix;
