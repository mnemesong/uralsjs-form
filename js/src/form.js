"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
var attribute_1 = require("./attribute");
var defValidFunction = function (attrs) { return []; };
var defPrintErrFunc = function (errs) { return 'Validation errors: ' + errs.join('. '); };
var Form = /** @class */ (function () {
    function Form(attributes, validFunc, printErrFunc) {
        if (attributes === void 0) { attributes = []; }
        if (validFunc === void 0) { validFunc = defValidFunction; }
        if (printErrFunc === void 0) { printErrFunc = defPrintErrFunc; }
        this.attributes = [];
        this.validFunc = defValidFunction;
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
        var data = {};
        this.attributes.forEach(function (a) { return data[a.getName()] = a.getValueOrNull(); });
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
    Form.prototype.addAttribute = function (name, validFunc, val) {
        if (val === void 0) { val = null; }
        this.attributes = this.attributes.concat([
            new attribute_1.Attribute(name, validFunc, val)
        ]);
    };
    return Form;
}());
exports.Form = Form;
