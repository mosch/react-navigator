# react-navigator

This is a react version of the [react-native navigator](https://facebook.github.io/react-native/docs/navigator.html) used in apps. 
We use this to implement the same navigating behavior in iOS and Web.

** This is a work in progress. No way to use this in production. Contributions welcome.** 

*Documentation stolen from react-native by Facebook:*

## Navigator Methods 
If you have a ref to the Navigator element, you can invoke several methods on it to trigger navigation:

### Implemented
* getCurrentRoutes() - returns the current list of routes
* jumpBack() - Jump backward without unmounting the current scene
* push(route) - Navigate forward to a new scene, squashing any scenes that you could jumpForward to
* pop() - Transition back and unmount the current scene
* popToTop() - Pop to the first scene in the stack, unmounting every other scene

### TBD
* popToRoute(route) - Pop to a particular scene, as specified by it's route. All scenes after it will be unmounted
* replace(route) - Replace the current scene with a new route
* replaceAtIndex(route, index) - Replace a scene as specified by an index
* replacePrevious(route) - Replace the previous scene
* immediatelyResetRouteStack(routeStack) - Reset every scene with an array of routes
* jumpForward() - Jump forward to the next scene in the route stack
* jumpTo(route) - Transition to an existing scene without unmounting
