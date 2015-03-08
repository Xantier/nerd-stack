var React = require('react');
var Router = require('react-router');
var { Route } = Router;

var App = require('./components/App.jsx');
var Home = require('./components/Home.jsx');
var Hello = require('./components/Hello.jsx');

var routes = (
    <Route handler={App}>
        <Route name="home" path="/" handler={Home} />
        <Route name="hello" path="/hello/:name" handler={Hello} />
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.body);
});
