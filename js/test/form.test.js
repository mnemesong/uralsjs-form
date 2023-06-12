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
(0, mocha_1.describe)("Form", function () {
    (0, mocha_1.it)("basics", function () {
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
            login: 'asd9ad9jasd',
            pass: '0fkjajasd'
        };
        form.load(dat);
        assert.deepStrictEqual(form.getData(), dat);
    });
});
