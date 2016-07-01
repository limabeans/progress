import { Mongo } from 'meteor/mongo';

export const Topics = new Mongo.Collection('topics');


TopicsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Topic Name",
        max: 200
    },
    summary: {
        type: String,
        label: "Summary of this topic",
        optional: true,
        max: 1000
    },
    items: {
        label: "items",
        type: [String]
    }
});

Topics.attachSchema(TopicsSchema);
