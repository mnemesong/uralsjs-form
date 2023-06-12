import { describe, it } from "mocha";
import * as assert from 'assert';
import { Form } from "../src/form";

describe("Form", () => {
    it("basics", () => {
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
            login: 'asd9ad9jasd',
            pass: '0fkjajasd'
        };
        form.load(dat);
        assert.deepStrictEqual(form.getAnyData(), dat)
    });
});