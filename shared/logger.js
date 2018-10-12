import React from 'react'

class LoggedComponent extends React.Component {
    componentDidMount() {
      log("Component[" + this.props.component_name + "] has mounted.");
    }

    render() {
        return ({this.props.children});
    }

    log(message) {
        console.debug(message);
    }
}

const Logger = (Component) => {
}