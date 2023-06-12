import { describe, it } from "mocha";
import * as assert from 'assert';
import { Attribute } from "../src/attribute";

describe("Attribute", () => {
    it("basics", () => {
        const attr = new Attribute(
            'login', 
            (val) => (typeof val === 'string') && (val.length > 7)
        );
        assert.strictEqual(attr.getValueOrNull(), null);
    })
});