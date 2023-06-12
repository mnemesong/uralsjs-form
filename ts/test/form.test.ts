import { describe, it } from "mocha";
import * as assert from 'assert';
import { Form } from "../src/form";
import { Attribute } from "../src/attribute";

describe("Form", () => {
    it("basics 1", () => {
        const form = new Form();
        form.addAttribute('login', (val) => {
            if ((typeof val === 'string') && val.length > 6) {
                return val;
            }
            throw new Error('Invalid login');
        });
        form.addAttribute('pass', (val) => {
            if ((typeof val === 'string') && val.length > 6) {
                return val;
            }
            throw new Error('Invalid pass');
        });
        form.setValidFunc((attrs) => attrs.map(
            a => (a.getName() !== 'login') 
                ? null
                : ((a.getValueOrNull() === 'asd9ad9jasd')
                    ? null
                    : "Login does not exist")

        ).filter(a => (a !== null)))
        const dat = {
            login: 'asd9ad9jasd',
            pass: '0fkjajasd'
        };
        form.load(dat);
        assert.deepStrictEqual(form.getAnyData(), dat)
    });

    it("basics 2", () => {
        const validFunc = (val) => {
            if ((typeof val === 'string') && val.length > 6) {
                return val;
            }
            throw new Error('Invalid login');
        };
        const form = new Form([
            new Attribute('login', validFunc, 'c4124c1k24c1'),
            new Attribute('pass', validFunc, 'dmasd8sad90')
        ]);
        const dat = {
            login: 'c4124c1k24c1',
            pass: 'dmasd8sad90'
        };
        assert.deepStrictEqual(form.getAnyData(), dat)
    });

    it("basics 3", () => {
        const form = new Form();
        form.addAttribute('login', (val) => {
            if ((typeof val === 'string') && val.length > 6) {
                return val;
            }
            throw new Error('Invalid login');
        });
        form.addAttribute('pass', (val) => {
            if ((typeof val === 'string') && val.length > 6) {
                return val;
            }
            throw new Error('Invalid pass');
        });
        const dat = {
            login: 'a412',
            pass: null
        };
        try {
            form.load(dat);
            throw new Error("Test error");
        } catch (e) {
            assert.strictEqual('Invalid login', e.message);
        }
    });

    it("basics 4", () => {
        const form = new Form();
        form.addAttribute('login', (val) => {
            if ((typeof val === 'string') && val.length > 6) {
                return val;
            }
            throw new Error('Invalid login');
        });
        form.setPrintErrFunc((errs) => 'Errs: ' + errs.join(''));
        form.setValidFunc((attrs) => attrs.map(
            a => (a.getName() !== 'login') 
                ? null
                : ((a.getValueOrNull() === 'asd9ad9jasd')
                    ? null
                    : "Login does not exist")

        ).filter(a => (a !== null)))
        const dat = {
            login: 'a412vu9v2359',
            pass: null
        };
        try {
            form.load(dat);
            form.validateStrictly();
            throw new Error("Test error");
        } catch (e) {
            assert.strictEqual("Errs: Login does not exist", e.message);
        }
    });
});