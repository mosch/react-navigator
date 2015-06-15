var React = require('react');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var Navigator = React.createClass({
    propTypes: {
        configureScene: React.PropTypes.func,
        initialRoute: React.PropTypes.object,
        initialRouteStack: React.PropTypes.array,
        navigationBar: React.PropTypes.node,
        navigator: React.PropTypes.object,
        onDidFocus: React.PropTypes.func,
        onItemRef: React.PropTypes.func,
        onWillFocus: React.PropTypes.func,
        renderScene: React.PropTypes.func,
        sceneStyle: React.PropTypes.func,
    },
    getInitialState() {
        return {
            routeStack: this.props.initialRouteStack || [this.props.initialRoute],
            currentRoute: 0,
            mountedScenes: []
        }
    },
    getDefaultProps() {
        return {
            configureScene: this.configureScene
        }
    },
    configureScene() {
        return 'onTop'
    },
    _getCurrentRoute() {
        return this.state.routeStack[this.state.currentRoute];
    },
    _getCurrentScene() {
        if (this.state.mountedScenes[this.state.currentRoute]) {
            return this.state.mountedScenes[this.state.currentRoute];
        } else {
            var Scene = this.props.renderScene(this.state.currentRoute, this);
            this.setState()
        }
    },
    /** Public API **/
    /** Returns the current list of routes **/
    getCurrentRoutes() {
        return this.state.routeStack;
    },
    /** Jump backward without unmounting the current scene **/
    jumpBack() {
        this.setState({currentRoute: this.state.currentRoute-1})
    },
    /** Jump forward to the next scene in the route stack **/
    jumpForward() {
        this.setState({currentRoute: this.state.currentRoute+1})
    },
    /** Transition to an existing scene without unmounting **/
    jumpTo(route) {
        var position = this.state.routeStack.indexOf(route);
        if (position) {
            this.setState({
                currentRoute: position
            });
        }
    },
    /** Navigate forward to a new scene, squashing any scenes that you could jumpForward to **/
    push(route) {
        var routeStack = this.state.routeStack;
        routeStack.push(route);
        this.setState({
            currentRoute: this.state.currentRoute+1,
            routeStack: routeStack
        });
    },
    /** Transition back and unmount the current scene **/
    pop() {
        var routeStack = this.state.routeStack;
        routeStack.splice(this.state.currentRoute, 1);
        this.setState({
            currentRoute: this.state.currentRoute-1,
            routeStack: routeStack
        });
    },
    /**  Pop to the first scene in the stack, unmounting every other scene **/
    popToTop() {
        this.setState({
            currentRoute: 0,
            routeStack: [this.state.routeStack[0]]
        });
    },
    render() {
        var Scene = this.props.renderScene(this._getCurrentRoute(), this);

        //var Transition = this.props.configureScene(this.state.currentRoute);
        return (
            <div>
                <TransitionGroup transitionName="onTop" component="div" className="flex container">
                    {Scene}
                </TransitionGroup>
                <div style={{display: 'none'}}>
                </div>
            </div>);
    }
    /**
    pop() -
    replace(route) - Replace the current scene with a new route
    replaceAtIndex(route, index) - Replace a scene as specified by an index
    replacePrevious(route) - Replace the previous scene
    immediatelyResetRouteStack(routeStack) - Reset every scene with an array of routes
    popToRoute(route) - Pop to a particular scene, as specified by it's route. All scenes after it will be unmounted
    () -
     **/
});


module.exports = Navigator;
