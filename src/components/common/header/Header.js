import React, { PureComponent, Fragment } from 'react'

export class Header extends PureComponent {
    render() {
        let { heading, goBack, action } = this.props;
        return (
            <Fragment>
                <button className="btn-back" onClick={goBack}>
                    <i className="material-icons">arrow_back</i>
                </button>
                <h1>{heading}</h1>
                {action}
            </Fragment>
        )
    }
}

export default Header

