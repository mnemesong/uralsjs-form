"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = void 0;
var Attribute = /** @class */ (function () {
    function Attribute(name, validFunc, val) {
        if (val === void 0) { val = null; }
        this.name = name;
        this.validFunc = validFunc;
        this.val = (val === null) ? null : this.validFunc(val);
    }
    Attribute.prototype.getName = function () {
        return this.name;
    };
    Attribute.prototype.getValidValue = function () {
        return this.validFunc(this.val);
    };
    Attribute.prototype.getValueOrNull = function () {
        return this.val;
    };
    Attribute.prototype.loadValue = function (val) {
        this.val = this.validFunc(val);
    };
    Attribute.prototype.setValidFunction = function (validFunc) {
        this.validFunc = validFunc;
    };
    Attribute.prototype.loadAndValidate = function (data) {
        if (data[this.name]) {
            this.val = this.validFunc(data[this.name]);
        }
    };
    return Attribute;
}());
exports.Attribute = Attribute;
