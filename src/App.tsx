import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import List from './pages/List';

const App: React.FC = () => {
    return <Router>
        <Switch>
            <Route exact path="/" component={List} />
        </Switch>
    </Router>;
};

export default App;