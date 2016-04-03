define(function (require) {
    QUnit.module("views/application");

    QUnit.test("applicationView - экземпляр Backbone.View", function () {

        var applicationView = require('./application'),
            application = new applicationView();

        QUnit.ok(application instanceof Backbone.View);

    });

    QUnit.test("applicationView работает (mainView)", function () {
        var applicationView = require('./application'),
            application = new applicationView(),
            $ = require('jquery');

        $('#qunit-fixture').addClass('content');

        application.show({'view': 'main'});

        QUnit.ok(application._views.main instanceof Backbone.View);
    });

    QUnit.test("applicationView работает (other views)", function () {
        var applicationView = require('./application'),
            application = new applicationView(),
            $ = require('jquery');

        $('#qunit-fixture').addClass('content');

        application.show({'view': 'menu'});
        application.show({'view': 'register'});
        application.show({'view': 'login'});
        application.show({'view': 'scoreboard'});
        application.show({'view': 'about'});
        application.show({'view': 'game'});

        _.each(application._views, function (item, index, list) {
            QUnit.ok(item instanceof Backbone.View);
        });
    });

    QUnit.test("applicationView mainView is visible", function () {
        var applicationView = require('./application'),
            application = new applicationView(),
            $ = require('jquery');

        $('#qunit-fixture').addClass('content');

        application.show({'view': 'main'});

        QUnit.ok(application._views.main.$el.is(':visible'));
    });

    QUnit.test("applicationView last showed view is visible, other hidden", function () {
        var applicationView = require('./application'),
            application = new applicationView(),
            $ = require('jquery');

        $('#qunit-fixture').addClass('content');

        application.show({'view': 'menu'});
        application.show({'view': 'register'});
        application.show({'view': 'login'});
        application.show({'view': 'scoreboard'});
        application.show({'view': 'about'});
        application.show({'view': 'game'});
        application.show({'view': 'main'});

        QUnit.ok(application._views.menu.$el.is(':hidden'));
        QUnit.ok(application._views.register.$el.is(':hidden'));
        QUnit.ok(application._views.login.$el.is(':hidden'));
        QUnit.ok(application._views.scoreboard.$el.is(':hidden'));
        QUnit.ok(application._views.about.$el.is(':hidden'));
        QUnit.ok(application._views.game.$el.is(':hidden'));
        QUnit.ok(application._views.main.$el.is(':visible'));
    });

    QUnit.test("applicationView show views are visible", function () {
        var applicationView = require('./application'),
            application = new applicationView(),
            $ = require('jquery');

        $('#qunit-fixture').addClass('content');

        application.show({'view': 'main'});
        QUnit.ok(application._views.main.$el.is(':visible'));

        application.show({'view': 'menu'});
        QUnit.notOk(application._views.menu.$el.is(':visible'));

        application.show({'view': 'register'});
        QUnit.ok(application._views.register.$el.is(':visible'));

        application.show({'view': 'login'});
        QUnit.ok(application._views.login.$el.is(':visible'));

        application.show({'view': 'scoreboard'});
        QUnit.ok(application._views.scoreboard.$el.is(':visible'));

        application.show({'view': 'about'});
        QUnit.ok(application._views.about.$el.is(':visible'));

    });


});
