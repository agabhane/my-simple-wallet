import React, { PureComponent, Fragment } from "react";
import SmartLayout from '../smartLayout/SmartLayout';
import Header from '../header/Header';
import CategoryTile from './CategoryTile';
import './Category.scss';


class Category extends PureComponent {
    
    selectCategory = (category) => {
        this.props.onSelectCategory(category.id);
    }

    render() {

        let {transaction, categories, goBack} = this.props;

        let header = <Header heading="Select Category" goBack={goBack}></Header>;

        let main = (
            <Fragment>
                <div className="amount-wrapper">
                    <div className="amount">{transaction.amount}</div>
                </div>
                <div className="categories-wrapper">
                    <div className="cateories">
                        {
                            categories.map(category => {
                                return (
                                    <CategoryTile key={category.id}
                                        category={category}
                                        selectCategory={this.selectCategory}
                                        isSelected={transaction.category && transaction.category.id === category.id}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </Fragment>
        );

        return (
            <SmartLayout header={header} main={main}></SmartLayout>
        );
    }
}

export default Category;