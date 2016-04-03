define(function (require) {
    QUnit.module("views/application");

    QUnit.test("applicationView - экземпляр Backbone.View", function () {

        var applicationView = require('./application'),
            application = new applicationView();

        QUnit.ok(application instanceof Backbone.View);

    });

    QUnit.test("applicationView работает", function () {
        var applicationView = require('./application'),
            application = new applicationView(),
            $ = require('jquery');
        
        $('#qunit-fixture').addClass('content');
        
        application.show({ 'view': 'main' });

        QUnit.ok(application._views.main instanceof Backbone.View);
    });


});
