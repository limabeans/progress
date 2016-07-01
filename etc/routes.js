FlowRouter.route('/', {
    name: 'homeRoute',
    action(params, queryParams) {
        BlazeLayout.render("homeTemplate", {content: "content"});
        console.log('you are loading the home page lel');
    }
});

FlowRouter.route('/qa', {
    name: 'qaRoute',
    action(params, queryParams) {
        BlazeLayout.render("qaTemplate", {content: "the content"});
    }
});

FlowRouter.route('/topics/:topicName', {
    name: 'topicRoute',
    action(params, queryParams) {
        BlazeLayout.render("topicTemplate",
                           {topicName: params.topicName});
    }
});


FlowRouter.route('/books', {
    name: 'booksRoute',
    action(params, queryParams) {
        BlazeLayout.render("booksTemplate", {content: "dhvani"});
    }
});

FlowRouter.route('/books/:bookName', {
    name: 'bookNameRoute',
    action(params, queryParams) {
        BlazeLayout.render("bookTemplate", {name: params.bookName});
    }
});


FlowRouter.route('/calendar', {
    name: 'calendarRoute',
    action(params, queryParams) {
        BlazeLayout.render("calendarTemplate", {content: "calendar"});
    }
});

FlowRouter.route('/tags', {
    name: 'tagsRoute',
    action(params, queryParams) {
        BlazeLayout.render("tagsTemplate", {content: 'tags'});
    }
});

FlowRouter.route('/tags/new', {
    name: 'newTagRoute',
    action(params, queryParams) {
        BlazeLayout.render("newTagTemplate", {content: 'tags'});
    }
});
