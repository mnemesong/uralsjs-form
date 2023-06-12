import { describe, it } from "mocha";
import * as assert from 'assert';
import { Attribute } from "../src/attribute";

describe("Attribute", () => {
    it("basics", () => {
        const attr = new Attribute(
            'login', 
            (val) => {
                if((typeof val === 'string') && (val.length > 7)) return val;
                throw new Error("Invalid login");
            }
        );
        assert.strictEqual(attr.getName(), 'login');
        assert.strictEqual(attr.getValueOrNull(), null);
        try{
            attr.getValidValue()
        } catch (e) {
            assert.strictEqual(e.message, "Invalid login");
        }
        attr.loadValue('dasiof12f');
        assert.strictEqual(attr.getValidValue(), 'dasiof12f');
    })
});