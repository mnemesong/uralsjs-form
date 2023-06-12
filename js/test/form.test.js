"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var assert = __importStar(require("assert"));
var form_1 = require("../src/form");
var attribute_1 = require("../src/attribute");
(0, mocha_1.describe)("Form", function () {
    (0, mocha_1.it)("basics 1", function () {
        var form = new form_1.Form();
        form.addAttribute('login', function (val) {
            if ((typeof val === 'string') && val.length > 6) {
                return val;
            }
            throw new Error('Invalid login');
        });
        form.addAttribute('pass', function (val) {
            if ((typeof val === 'string') && val.length > 6) {
                return val;
            }
            throw new Error('Invalid pass');
        });
        form.setValidFunc(function (attrs) { return attrs.map(function (a) { return (a.getName() !== 'login')
            ? null
            : ((a.getValueOrNull() === 'asd9ad9jasd')
                ? null
                : "Login does not exist"); }).filter(function (a) { return (a !== null); }); });
        var dat = {
            login: 'asd9ad9jasd',
            pass: '0fkjajasd'
        };
        form.load(dat);
        assert.deepStrictEqual(form.getAnyData(), dat);
    });
    (0, mocha_1.it)("basics 2", function () {
        var validFunc = function (val) {
            if ((typeof val === 'string') && val.length > 6) {
                return val;
            }
            throw new Error('Invalid login');
        };
        var form = new form_1.Form([
            new attribute_1.Attribute('login', validFunc, 'c4124c1k24c1'),
            new attribute_1.Attribute('pass', validFunc, 'dmasd8sad90')
        ]);
        var dat = {
            login: 'c4124c1k24c1',
            pass: 'dmasd8sad90'
        };
        assert.deepStrictEqual(form.getAnyData(), dat);
    });
    (0, mocha_1.it)("basics 3", function () {
        var form = new form_1.Form();
        form.addAttribute('login', function (val) {
            if ((typeof val === 'string') && val.length > 6) {
                return val;
            }
            throw new Error('Invalid login');
        });
        form.addAttribute('pass', function (val) {
            if ((typeof val === 'string') && val.length > 6) {
                return val;
            }
            throw new Error('Invalid pass');
        });
        var dat = {
            login: 'a412',
            pass: null
        };
        try {
            form.load(dat);
            throw new Error("Test error");
        }
        catch (e) {
            assert.strictEqual('Invalid login', e.message);
        }
    });
    (0, mocha_1.it)("basics 4", function () {
        var form = new form_1.Form();
        form.addAttribute('login', function (val) {
            if ((typeof val === 'string') && val.length > 6) {
                return val;
            }
            throw new Error('Invalid login');
        });
        form.setPrintErrFunc(function (errs) { return 'Errs: ' + errs.join(''); });
        form.setValidFunc(function (attrs) { return attrs.map(function (a) { return (a.getName() !== 'login')
            ? null
            : ((a.getValueOrNull() === 'asd9ad9jasd')
                ? null
                : "Login does not exist"); }).filter(function (a) { return (a !== null); }); });
        var dat = {
            login: 'a412vu9v2359',
            pass: null
        };
        try {
            form.load(dat);
            form.validateStrictly();
            throw new Error("Test error");
        }
        catch (e) {
            assert.strictEqual("Errs: Login does not exist", e.message);
        }
    });
});
