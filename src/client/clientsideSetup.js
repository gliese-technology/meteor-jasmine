var testFramework = new ClientTestFramework()
Meteor.startup(function () {
  testFramework.runTests()
})
