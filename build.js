/**
 * Created by Renato on 28/01/2016.
 */

var Metalsmith = require('metalsmith'),
    Markdown = require('metalsmith-markdown'),
    Templates = require('metalsmith-templates'),
    Handlebars = require('handlebars'),
    FS = require('fs'),
    Collections = require('metalsmith-collections'),
    Permalinks = require('metalsmith-permalinks');

//Registering the template partials
Handlebars.registerPartial('header', FS.readFileSync(__dirname + '/templates/partials/header.html').toString());
Handlebars.registerPartial('footer', FS.readFileSync(__dirname + '/templates/partials/footer.html').toString());

Metalsmith(__dirname)
    .use(Collections({
        pages: {
            pattern: 'content/pages/*.md'
        },
        posts: {
            pattern: 'content/posts/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(Markdown())
    .use(Permalinks({
        pattern: ':collection/:title'
    }))
    .use(Templates('handlebars'))
    .destination('./build')
    .build(function (err) {
        if (err) {
            console.log(err);
        }
    });