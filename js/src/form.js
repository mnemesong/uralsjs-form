"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
var attribute_1 = require("./attribute");
var Form = /** @class */ (function () {
    function Form(attributes, validFunc, printErrFunc) {
        if (attributes === void 0) { attributes = []; }
        if (printErrFunc === void 0) { printErrFunc = function (errs) { return 'Validation errors: ' + errs.join('. '); }; }
        this.attributes = [];
        this.attributes = attributes;
        this.validFunc = validFunc;
        this.printErrFunc = printErrFunc;
    }
    Form.prototype.load = function (data) {
        this.attributes.forEach(function (a) { return a.loadAndValidate(data); });
    };
    Form.prototype.setValidFunc = function (func) {
        this.validFunc = func;
    };
    Form.prototype.getValidFunction = function () {
        return this.validFunc;
    };
    Form.prototype.getData = function () {
        var data = this.attributes.forEach(function (a) { return data[a.getName()] = a.getValueOrNull(); });
        return data;
    };
    Form.prototype.validate = function () {
        return this.validFunc(this.attributes);
    };
    Form.prototype.validateStrictly = function () {
        var errors = this.validate();
        if (errors.length > 0) {
            throw new Error(this.printErrFunc(errors));
        }
    };
    Form.prototype.withAttribute = function (name, validFunc, val) {
        if (val === void 0) { val = null; }
        return new Form(this.attributes.concat([
            new attribute_1.Attribute(name, validFunc, val)
        ]), this.validFunc, this.printErrFunc);
    };
    return Form;
}());
exports.Form = Form;
