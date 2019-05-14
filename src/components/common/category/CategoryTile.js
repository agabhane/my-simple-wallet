import React, { PureComponent } from 'react'

export class CategoryTile extends PureComponent {
    constructor(props) {
        super(props)
        this.selectCategory = this.selectCategory.bind(this);
    };

    selectCategory() {
        this.props.selectCategory(this.props.category);
    }

    render() {
        let {category, className} = this.props;
        return (
            <div className={className} onClick={this.selectCategory}>
                <div className="budget">{category.amount}</div>
                <div className="name">{category.name}</div>
            </div>
        )
    }
}

export default CategoryTile
