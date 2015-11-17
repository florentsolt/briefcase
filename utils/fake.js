"use strict";

var faker = require("faker");

var Logger = require("../inc/Logger");
var Es = require("../elasticsearch/client");

var User = require("../models/User/Model");
var Project = require("../models/Project/Model");
var Issue = require("../models/Issue/Model");
var Question = require("../models/Question/Model");
var Idea = require("../models/Idea/Model");
var Poll = require("../models/Poll/Model");
var Wiki = require("../models/Wiki/Model");
var File = require("../models/File/Model");
var Mail = require("../models/Mail/Model");
var Image = require("../models/Image/Model");
var Url = require("../models/Url/Model");
var Comment = require("../models/Comment/Model");
var Commit = require("../models/Commit/Model");
var Redis = require("../redis/client");

const counters = {
    projects: 5,
    issues: 40,
    comments: 40,
    questions: 10,
    wikis: 10,
    ideas: 10,
    polls: 10,
    mails: 10,
    files: 10,
    images: 10,
    urls: 10,
    commits: 100,
    userChildren: 20,
    userFollowees: 20
};

Es.flush().then(() => {
    return Redis.flushdb();
}).then(() => {
    return User.create({
        id: "admin",
        createdAt: faker.date.past()
    }, {
        password: "admin",
        fullname: "Administrator",
        email: "admin@example.com"
    });
}).then((user) => {
    let promises = [];
    let projects = [];

    for (let i = 0; i < counters.projects; i++) {
        promises.push(Project.create({
            id: `project-${i + 1}`,
            createdAt: faker.date.past()
        }, {
            name: `Project ${i + 1}`,
            description: faker.lorem.sentences(3)
        }).then((project) => {
            projects.push(project);
        }));
    }

    return Promise.all(promises).then(() => {
        return {user: user, projects: projects};
    });
}).then((args) => {
    let promises = [];
    args.issues = [];

    // Issue
    for (let i = 0; i < counters.issues; i++) {
        promises.push(Issue.create({
            createdAt: faker.date.past()
        },{
            subject: faker.lorem.sentence(),
            description: faker.lorem.sentences(10),
            status: faker.random.arrayElement(["Open", "Specs", "Code", "Review", "QA", "Release"]),
            priority: faker.random.arrayElement(["Urgent", "P1", "P2", "P3", "P4"])
        }).then((model) => {
            args.issues.push(model);
            return model.addParent(faker.random.arrayElement(args.projects));
        }).then((model) => {
            return model.addDerivator(args.user);
        }));
    }
    return Promise.all(promises).then(() => {
        return args;
    });
}).then((args) => {
    let promises = [];

    // Comment
    for (let i = 0; i < counters.comments; i++) {
        promises.push(Comment.create({
            createdAt: faker.date.past()
        },{
            text: faker.lorem.sentences(faker.random.number(5) + 1)
        }).then((model) => {
            return model.addDerivator(args.user);
        }));
    }

    // Question
    for (let i = 0; i < counters.questions; i++) {
        promises.push(Question.create({
            createdAt: faker.date.past()
        },{
            text: faker.lorem.sentence().replace(/\.$/, " ?")
        }).then((model) => {
            return model.addDerivator(args.user);
        }));
    }

    // Wiki
    for (let i = 0; i < counters.wikis; i++) {
        promises.push(Wiki.create({
            createdAt: faker.date.past()
        },{
            title: faker.lorem.sentence(),
            content: faker.lorem.sentences(10)
        }).then((model) => {
            return model.addDerivator(args.user);
        }));
    }

    // Idea
    for (let i = 0; i < counters.ideas; i++) {
        promises.push(Idea.create({
            createdAt: faker.date.past()
        },{
            text: faker.lorem.sentence()
        }).then((model) => {
            return model.addDerivator(args.user);
        }));
    }

    // Poll
    for (let i = 0; i < counters.polls; i++) {
        promises.push(Poll.create({
            createdAt: faker.date.past()
        },{
            title: faker.lorem.sentence(),
            choices: [faker.lorem.sentences(5).split("\n")]
        }).then((model) => {
            return model.addDerivator(args.user);
        }));
    }

    // Mail
    for (let i = 0; i < counters.mails; i++) {
        promises.push(Mail.create({
            createdAt: faker.date.past()
        },{
            from: faker.name.findName(),
            to: faker.name.findName(),
            subject: faker.lorem.sentence(),
            body: faker.lorem.sentences(20)
        }).then((model) => {
            return model.addDerivator(args.user);
        }));
    }

    // File
    for (let i = 0; i < counters.files; i++) {
        promises.push(File.create({
            createdAt: faker.date.past()
        }, {
            name: faker.lorem.words(3).join("-") + "." + faker.random.arrayElement(["zip", "txt", "csv", "xls", "pdf", "doc"]),
            size: faker.random.number()
        }).then((model) => {
            return model.addDerivator(args.user);
        }));
    }

    // Image
    for (let i = 0; i < counters.images; i++) {
        promises.push(Image.create({
            createdAt: faker.date.past()
        },{
            name: faker.lorem.words(3).join("-") + "." + faker.random.arrayElement(["jpg", "png", "gif"]),
            size: faker.random.number(),
            width: faker.random.number(),
            height: faker.random.number()
        }).then((model) => {
            return model.addDerivator(args.user);
        }));
    }

    // Url
    for (let i = 0; i < counters.urls; i++) {
        promises.push(Url.create({
            createdAt: faker.date.past()
        },{
            title: faker.lorem.sentence(),
            url: faker.internet.url()
        }).then((model) => {
            return model.addDerivator(args.user);
        }));
    }

    // Commit
    for (let i = 0; i < counters.commits; i++) {
        promises.push(Commit.create({
            createdAt: faker.date.past()
        },{
            message: faker.lorem.sentence()
        }).then((model) => {
            return model.addDerivator(args.user);
        }));
    }

    return Promise.all(promises).then((models) => {
        return Promise.all(models.map((model) => {
            return model.addParent(faker.random.arrayElement(args.issues));
        }));
    }).then((models) => {
        let promises = [];
        for (let i = 0; i < counters.userChildren; i++) {
            promises.push(args.user.addChild(faker.random.arrayElement(models)));
        }
        for (let i = 0; i < counters.userFollowees; i++) {
            promises.push(args.user.addFollowee(faker.random.arrayElement(models)));
        }
        return Promise.all(promises).then(() => {
            return models;
        });
    }).then((models) => {
        return Promise.all(models.map((model) => {
            return model.addParent(faker.random.arrayElement(args.projects));
        }));
    });
}).then(() => {
    return Es.indexRelations();
}).then(() => {
    return Redis.disconnect();
}).then(() => {
    return Es.refresh();
}).catch((e) => {
    Logger.error(e);
});