"use strict";

describe("Project", () => {
    beforeAll(() => {
        this.Project = require("../models/Project/Model");
        this.id = "myproject";
        this.data = {
            name: "My Project",
            description: "Description..."
        };
    });

    it("should be created", (done) => {
        this.Project.create(this.id, this.data).then((model) => {
            this.model = model;
            expect(model.id).toEqual(this.id);
        }).then(() => {
            done();
        }).catch((e) => {
            done.fail(e);
        });
    });

    it("should be add as parent", (done) => {
        require("../models/User/Model").create("questioner", {
            "password": "questioner"
        }).then(() => {
            return require("../models/Question/Model").create({
                "text": "What ?"
            });
        }).then((question) => {
            this.question = question;
            return question.addParent(this.model);
        }).then((question) => {
            return Promise.all([this.model.children(), question.parents()]);
        }).then((childrenAndParents) => {
            let children = childrenAndParents[0];
            let parents = childrenAndParents[1];

            expect(children.length).toBe(1);
            expect(children[0].ref).toBe(this.question.ref);

            expect(parents.length).toBe(1);
            expect(parents[0].ref).toBe(this.model.ref);

            done();
        }).catch((e) => {
            done.fail(e);
        });
    });

});
