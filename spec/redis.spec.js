"use strict";

describe("Redis", function() {
    beforeAll(function() {
        this.redis = require("../redis/client");
        this.key = "__test-key__" + Math.random();
        this.value = "__test-value__" + Math.random();
    });

    afterAll(function() {
        // this.redis.quit();
    });

    it("should work with SET", function(done) {
        this.redis.set(this.key, this.value).then(function(reply) {
            expect(reply).toEqual("OK");
            done();
        }).catch(function(err) {
            expect(err).toBeNull();
        });
    });

    it("should work with GET", function(done) {
        this.redis.get(this.key).then(function(value) {
            expect(value).toEqual(this.value);
            done();
        }.bind(this));
    });

    it("should work with DEL", function(done) {
        this.redis.del(this.key).then(function(reply) {
            expect(reply).toEqual(1);
            done();
        });
    });

    it("should return null values with missing keys", function(done) {
        this.redis.get(this.key).then(function(reply) {
            expect(reply).toBeNull();
            done();
        });
    });

    it("should work with INCR", function(done) {
        this.redis.incr(this.key).then(function(reply) {
            expect(reply).toEqual(1);
            this.redis.del(this.key).then(function(reply) {
                expect(reply).toEqual(1);
                done();
            });
        }.bind(this));
    });


});
