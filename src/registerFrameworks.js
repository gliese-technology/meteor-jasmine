/* globals frameworks: true */

frameworks = {}

isMirror = function () {
  return !!process.env.IS_MIRROR;
}

isMainApp = function () {
  return !isMirror();
}

isTestPackagesMode = function () {
  return !!process.env.VELOCITY_TEST_PACKAGES;
}

shouldRunFramework = function (frameworkName) {
  return process.env.FRAMEWORK === frameworkName || isTestPackagesMode();
}

if (process.env.VELOCITY !== '0') {

  // Server tests
  frameworks.server = new ServerTestFramework()

  if (isMainApp()) {
    frameworks.server.registerWithVelocity()
    if (!isTestPackagesMode()) {
      Velocity.startup(function () {
        frameworks.server.startMirror()
      })
    }
  }

  if (shouldRunFramework(frameworks.server.name)) {
    Meteor.startup(function () {
      // Queue our function after all other normal startup functions
      Meteor.startup(function () {
        frameworks.server.start()
      })
    })
  }


  // Client tests
  frameworks.client = new ClientTestFramework()

  if (isMainApp()) {
    frameworks.client.registerWithVelocity()
    Velocity.startup(function () {
      // In test packages mode this does not really create a new mirror
      // It just registers the app as mirror.
      frameworks.client.startMirror()
    })
  }

}
