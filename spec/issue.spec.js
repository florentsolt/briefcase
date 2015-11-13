"use strict";

const Directory = require("../inc/Directory");

describe("Issue", () => {
    beforeAll(() => {
        this.Issue = Directory.model("Issue");
        this.data = {
            title: "Title",
            description: "Description"
        };
    });

    it("should be created", (done) => {
        this.Issue.create(this.data).then((model) => {
            this.model = model;
            expect(model.id).toBeGreaterThan(0);
            expect(model.createdAt).toBeGreaterThan(0);
            expect(model.updatedAt).toBeGreaterThan(0);
            expect(model.createdAt).toEqual(model.updatedAt);
        }).then(() => {
            done();
        }).catch((e) => {
            done.fail(e);
        });
    });

    it("should be add as child", (done) => {
        Directory.model("User").create("userParent", {
            "password": "userParent"
        }).then((user) => {
            this.userParent = user;
            return this.userParent.addChild(this.model);
        }).then(() => {
            return Promise.all([this.userParent.children(), this.model.parents()]);
        }).then((childrenAndParents) => {
            let children = childrenAndParents[0];
            let parents = childrenAndParents[1];

            expect(children.length).toBe(1);
            expect(children[0].ref).toBe(this.model.ref);

            expect(parents.length).toBe(1);
            expect(parents[0].ref).toBe(this.userParent.ref);

            done();
        }).catch((e) => {
            done.fail(e);
        });
    });

    it("should be add as follower", (done) => {
        Directory.model("User").create("userFollower", {
            "password": "userFollower"
        }).then((user) => {
            this.userFollower = user;
            return this.model.addFollower(this.userFollower);
        }).then(() => {
            return Promise.all([this.userFollower.followees(), this.model.followers()]);
        }).then((follweesAndFollwers) => {
            let follwees = follweesAndFollwers[0];
            let follwers = follweesAndFollwers[1];

            expect(follwees.length).toBe(1);
            expect(follwees[0].ref).toBe(this.model.ref);

            expect(follwers.length).toBe(1);
            expect(follwers[0].ref).toBe(this.userFollower.ref);

            done();
        }).catch((e) => {
            done.fail(e);
        });
    });

});
