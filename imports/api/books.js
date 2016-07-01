import { Mongo } from 'meteor/mongo';

export const Books = new Mongo.Collection('books');


BooksSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Book name",
    },
    author: {
        type: String,
        label: "Author",
    },
    numPages: {
        type: Number,
        label: "number of pages"
    },
    pages: {
        label: "pages",
        type: [Object],
        optional: true
    },
    "pages.$.pageNum": {
        type: Number
    },
    "pages.$.pageFreq": {
        type: Number
    }

});

Books.attachSchema(BooksSchema);
