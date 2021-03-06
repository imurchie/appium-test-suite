"use strict";

var setup = require("../../common/setup-base")
  , chai = require('chai')
  , _ = require('underscore');

chai.should();

var desired = {
  app: 'settings'
};

describe("prefs @skip-ios6 @skip-real-device", function () {
  // TODO: cannot install settings app on ios6

  var checkLocServ = function (driver, expected, cb) {
    driver
      .elementsByClassName('UIATableCell').at(1).click()
      .sleep(1000)
      // .elementByClassName('UIATableCell')
      .elementByAccessibilityId('Location Services')
        .click()
      .sleep(1000)
      .elementByClassName('UIASwitch')
      .getValue().should.become(expected)
      .nodeify(cb);
  };

  describe('settings app with location services', function () {
    var driver;
    setup(this, _.defaults({locationServicesEnabled: true}, desired))
      .then(function (d) { driver = d; });

    it('should respond to positive locationServicesEnabled cap', function (done) {
      checkLocServ(driver, 1, done);
    });
  });

  describe('settings app without location services', function () {
    var driver;
    setup(this, _.defaults({locationServicesEnabled: false}, desired))
      .then(function (d) { driver = d; });

    it('should respond to negative locationServicesEnabled cap', function (done) {
      checkLocServ(driver, 0, done);
    });
  });
});
