"use strict";

describe("Model", () => {
    beforeAll(() => {
        this.Model = require("../inc/Model");
        this.Directory = require("../inc/Directory");

        class Sample extends this.Model {}
        this.klass = Sample;
        this.Directory.register(Sample);
    });

    it("should be extendable", (done) => {
        this.sample = new this.klass();
        if (this.sample instanceof this.klass) {
            if (this.sample instanceof this.Model) {
                done();
            } else {
                done.fail("sample must be an instance of Model");
            }
        } else {
            done.fail("sample must be an instance of Sample");
        }
    });

    it("sould be serializable", (done) => {
        var data = this.sample.encode();
        if (typeof data === "string") {
            var model = this.Model.decode(data);

            if (typeof model === "object") {
                if (model instanceof this.Model) {
                    if (model instanceof this.klass) {
                        done();
                    } else {
                        done.fail("Decoded model should be a instance of Sample");
                    }
                } else {
                    done.fail("Decoded model should be a instance of Model");
                }
            } else {
                done.fail("Decoded model should be an object");
            }

        } else {
            done.fail("Encoded model should be a string");
        }
    });

    it("sould be hashable", (done) => {
        let hash1 = this.sample.hash();
        this.sample.at("/foo", 42);
        let hash2 = this.sample.hash();
        if (hash1 === hash2) {
            done.fail("Modifiying a model should change its hash");
        }

        // let serial1 = this.serialize.decode(this.serialize.encode(this.sample));
        // let hash3 = serial1.hash();
        // if (hash3 !== hash2) {
        //     done.fail("Hashing should be consistent through serialization");
        // }

        this.sample.remove("/foo");
        let hash4 = this.sample.hash();
        if (hash1 !== hash4) {
            done.fail("Hash should be only based on data");
        }

        // let serial2 = this.serialize.decode(this.serialize.encode(this.sample));
        // let hash5 = serial2.hash();
        // if (hash5 !== hash1) {
        //     done.fail("Hashing should be consistent through serialization");
        // }
        done();
    });


});
