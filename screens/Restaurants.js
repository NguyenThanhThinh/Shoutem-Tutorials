import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    CardStack,
    NavigationBar,
} from '@shoutem/ui/navigation';

import {navigatePop} from '../redux';
import RestaurantsList from './RestaurantsList';
import RestaurantsGrid from './RestaurantsGrid';
import RestaurantDetails from './RestaurantDetails';

class Restaurants extends Component {
    static propTypes = {
        onNavigateBack: PropTypes.func.isRequired,
        navigationState: PropTypes.object,
        scene: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.renderNavBar = this.renderNavBar.bind(this);
        this.renderScene = this.renderScene.bind(this);
    }

    renderScene(props) {
        const {route} = props.scene;

        let Screen = RestaurantsGrid; //route.key === 'RestaurantDetails' ? RestaurantDetails : RestaurantsGrid;

        if (route.key === 'RestaurantsGrid') {
            Screen = RestaurantsGrid;
        }
        else if (route.key === 'RestaurantsList') {
            Screen = RestaurantsList;
        }
        else if (route.key === 'RestaurantDetails') {
            Screen = RestaurantDetails;
        }

        return (<Screen {...route.props} />);
    }

    renderNavBar(props) {
        const {onNavigateBack} = this.props;

        return (
            <NavigationBar.View
                {...props}
                onNavigateBack={onNavigateBack}
            />
        );
    }

    render() {
        const {navigationState, onNavigateBack} = this.props;

        return (
            <CardStack
                navigationState={navigationState}
                onNavigateBack={onNavigateBack}
                renderNavBar={this.renderNavBar}
                renderScene={this.renderScene}
            />
        );
    }
}

export default connect(
    state => ({navigationState: state.navigationState}),
    {onNavigateBack: navigatePop}
)(Restaurants);