import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

import { Entries } from '../imports/api/entries.js';
import { Topics } from '../imports/api/topics.js';
import { Books } from '../imports/api/books.js';
import { TagEntries } from '../imports/api/tagEntries.js';




AutoForm.hooks({
    addBookForm: {
        onSuccess(formType, result) {
            var id = result;
            var book = Books.findOne({_id: id});
            var numPages = book.numPages;
            
            // Add dumby object to get page and array indexes lined up.
            Books.update({_id: id},
                         {$push: {pages:
                                  { pageNum: -1,
                                    pageFreq: -1
                                  }
                                 }
                         });
            for (var i = 1; i <= parseInt(numPages); i++) {
                Books.update({_id: id},
                             {$push: {pages:
                                      { pageNum: i,
                                        pageFreq: 0
                                      }
                                     }
                             });
            }
        }
    }
});


Template.calendarTemplate.helpers({
    options() {
        return {
            defaultView: 'basicWeek'
        };
    }
});

Template.bookTemplate.helpers({
    getAuthor() {
        var bookName = FlowRouter.getParam('bookName');
        return Books.findOne({name: bookName}).author;
    },
    getPages() {
        var bookName = FlowRouter.getParam('bookName');
        return Books.findOne({name: bookName}).pages;
    },
    getPageFreq(pageNum) {
        var bookName = FlowRouter.getParam('bookName');
        var pageFreq = Books.findOne({name: bookName}).pages[pageNum].pageFreq;
        if (pageFreq == 0) {
            return false;
        } else {
            return true;
        }
    }
});


Template.homeTemplate.events({
    'click .deleteButton': function(e) {
        var topicsId = e.currentTarget.id;
        Topics.remove(topicsId);
    }
});


Template.homeTemplate.helpers({
    getTopicsCollection() {
        return Topics.find({});
    },
    getTopicLength(topicObject) {
        return topicObject.items.length;
    },
    deleteTopic(topicObject) {
        Topics.deleteOne({_id: topicObject._id});
    }
});


Template.booksTemplate.helpers({
    getBooksCollection() {
        return Books.find({});
    }
});

Template.addBookForm.helpers({
    bookFormCollection() {
        return Books;
    }
});



Template.addTopicForm.helpers({
    topicFormCollection() {
        return Topics;
    }
});

Template.updateTopicForm.helpers({
    topicFormCollection() {
        return Topics;
    }
});

Template.addTagEntryForm.helpers({
    tagEntryFormCollection() {
        console.log('tagEntryFormCollection');
        return TagEntries;
    }
});


Template.topicTemplate.helpers({
    getSummary() {
        var topicName = FlowRouter.getParam('topicName');
        return Topics.findOne({name: topicName}).summary;
    },
    getItems() {
        var topicName = FlowRouter.getParam('topicName');
        return Topics.findOne({name: topicName}).items;
    },
});


Template.topicTemplate.events({
    'submit .new-item'(event) {
        event.preventDefault();
        
        // Get value from form element
        const target = event.target;
        const text = target.text.value;
        var topicName = FlowRouter.getParam('topicName');
        var id = Topics.findOne({name:topicName})._id;
        Topics.update({_id: id},
                      {$push: {items: text}});
        target.text.value = '';
    }
});


Template.qaTemplate.helpers({
    getEntries() {
        return Entries.find({});
    }
});


Template.addQA.events({
    
    'click .submitButton': function() {
        var question = document.getElementById("q").value;
        var answer = document.getElementById("a").value;
        var source = document.getElementById("s").value;
        Entries.insert({
            'question': question,
            'answer': answer,
            'source': source
        });
        document.getElementById("q").value = "";
        document.getElementById("a").value = "";
        document.getElementById("s").value = "";

    }
});


Template.bookTemplate.events({
    'click .pageBtn': function(e) {
        var pageNum = e.currentTarget.id;
        var bookName = FlowRouter.getParam('bookName');
        var book = Books.findOne({name: bookName});
        var bookId = book._id;

        var pageFreq = book.pages[pageNum].pageFreq;

        var pageString = "pages."+pageNum+".pageFreq";
        
        var obj = {};
        obj[pageString] = 1+pageFreq;

        Books.update({_id: bookId},
                     {$set: obj });
    }});


Template.tagsTemplate.helpers({
    getTagEntries() {
        return TagEntries.find({});
    },
    getTags() {
        var tagEntries = TagEntries.find({});
        var tags = {};
        tagLists = tagEntries.fetch().map(e => e.tags);
        for (var i = 0; i < tagLists.length; i++) {
            var entryTagList = tagLists[i];
            for (var j = 0; j < entryTagList.length; j++) {
                tags[entryTagList[j]] = 1;
            }
        }
        var tagsList = Object.keys(tags);
        return tagsList;
    },
    getEntriesByTag(tag) {
        return TagEntries.find({tags: tag });
    }
});

Template.tagsTemplate.events({
    'click .deleteButton': function(e) {
        var tagEntryId = e.currentTarget.id;
        TagEntries.remove(tagEntryId);
    },
    'submit .new-item'(event) {
        event.preventDefault();
        // Get value from form element
        const target = event.target;
        const newTag = target.text.value;
        const entryId = this._id;
        TagEntries.update({_id: entryId},
                          {$push: {tags: newTag }
                          });
        target.text.value = '';
    }
});

