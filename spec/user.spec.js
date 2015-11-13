"use strict";

describe("User", () => {
    beforeAll(() => {
        this.User = require("../models/User/Model");
        this.Es = require("../elasticsearch/client");
        this.id1 = "example1";
        this.data1 = {
            "fullname": "Mr Example 1",
            "email": "example1@example.com",
            "password": "secret1"
        };
        this.id2 = "example2";
        this.data2 = {
            "fullname": "Mr Example 2",
            "email": "example2@example.com",
            "password": "secret2"
        };
        this.model1 = null;
        this.model2 = null;
    });

    it("should be created", (done) => {
        this.User.create(this.id1, this.data1).then((model) => {
            this.model1 = model;
            expect(model.id).toEqual(this.id1);
        }).then(() => {
            return this.User.create(this.id2, this.data2);
        }).then((model) => {
            this.model2 = model;
            done();
        }).catch((e) => {
            done.fail(e);
        });
    });

    it("sould be found by id", (done) => {
        this.User.find(this.model1.id).then((model) => {
            expect(model.id).toEqual(this.model1.id);
            expect(model.id).toEqual(this.id1);
            expect(model.at("/fullname")).toEqual(this.data1.fullname);
            expect(model.at("/email")).toEqual(this.data1.email);
            done();
        });
    });

    it("sould be found by fullname", (done) => {
        this.Es.refresh().then(() => {
            return this.Es.search("type:User fullname:\"" + this.data1.fullname + "\"");
        }).then((results) => {
            expect(results.models.length).toEqual(1);
            expect(results.models[0].id).toEqual(this.id1);
            expect(results.models[0].at("/fullname")).toEqual(this.data1.fullname);
            expect(results.models[0].at("/email")).toEqual(this.data1.email);
            done();
        });
    });

    it("sould not be found by password", (done) => {
        this.Es.search("type:User password:" + this.data1.password).then((results) => {
            expect(results.total).toEqual(0);
            done();
        });
    });

    it("sould all be found", (done) => {
        this.User.all().then((users) => {
            expect(Array.isArray(users)).toBe(true);
            expect(users.length).toBeGreaterThan(1);
            done();
        });
    });

    it("sould be not found", (done) => {
        this.User.find(0).then((model) => {
            expect(model).toBeNull();
            done();
        }).catch((e) => {
            done.fail(e);
        });
    });

    it("sould be removed", (done) => {
        this.model1.delete().then(() => {
            return this.model2.delete();
        }).then(() => {
            done();
        }).catch((e) => {
            done.fail(e);
        });
    });
});
