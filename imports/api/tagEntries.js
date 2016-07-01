import { Mongo } from 'meteor/mongo';

export const TagEntries = new Mongo.Collection('tagEntries');


TagEntries.attachSchema(new SimpleSchema({
    text: {
        type: String,
        label: 'text',
    },
    tags: {
        type: [String],
        label: 'tags'
    },
    source: {
        type: String,
        label: 'source'
    },
    URL: {
        type: String,
        label: 'URL',
        optional: true
    }
}));
