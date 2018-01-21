import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    Button,
    DropDownMenu,
    Image,
    ListView,
    View,
    Tile,
    Text,
    Icon,
    Card,
    Title,
    Caption,
    GridRow,
    Subtitle,
    TouchableOpacity,
    Screen,
    Divider,
    ImageBackground
} from '@shoutem/ui';

import {
    NavigationBar,
} from '@shoutem/ui/navigation';
import {connect} from 'react-redux';

import {navigatePush} from '../redux';

class rightButton extends React.Component {
    render() {
        return(
            <View styleName="container" virtual>
                <Button>
                    <Icon name="cart"/>
                </Button>
            </View>
        );
    }
}
// const rightButton = () => {
//     const cars = require("../assets/data/menu");
//     var selectedCar = null;
//     return (
//         <View styleName="container" virtual>
//             <DropDownMenu
//                 options={cars}
//                 selectedOption={selectedCar ? selectedCar : cars[0]}
//                 onOptionSelected={(car) => {
//                         selectedCar = car;
//                         console.log(selectedCar);
//                     }
//                 }
//                 titleProperty="title"
//                 valueProperty="value"
//             />
//         </View>
//     );
// }


class RestaurantsGrid extends Component {
    static propTypes = {
        onButtonPress: PropTypes.func,
        onDetailsButtonPress: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);

        this.state = {
            restaurants: this.getRestaurants(),
        }
    }

    getRestaurants() {
        return require('../assets/data/restaurants.json');
    }

    renderRow(restaurants, sectionId, index) {
        const {onButtonPress, onDetailsButtonPress} = this.props;

        if (index === '0') {
            const restaurant = restaurants[0];
            return (
                <TouchableOpacity onPress={() => onButtonPress(restaurant)}>
                    <ImageBackground
                        styleName="large-banner"
                        source={{uri: restaurant.image.url}}
                    >
                        <Tile>
                            <Title styleName="md-gutter-bottom">{restaurant.name}</Title>
                            <Subtitle styleName="sm-gutter-horizontal">{restaurant.address}</Subtitle>
                        </Tile>
                    </ImageBackground>
                    <Divider styleName="line"/>
                </TouchableOpacity>
            );
        }

        const cellViews = restaurants.map((restaurant, id) => {
            return (
                <TouchableOpacity key={id} styleName="flexible" onPress={() => onDetailsButtonPress(restaurant)}>
                    <Card styleName="flexible">
                        <Image
                            styleName="medium-wide"
                            source={{uri: restaurant.image.url}}
                        />
                        <View styleName="content">
                            <Subtitle numberOfLines={3}>{restaurant.name}</Subtitle>
                            <View styleName="horizontal">
                                <Caption styleName="collapsible" numberOfLines={2}>{restaurant.address}</Caption>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
            );
        });

        return (
            <GridRow columns={2}>
                {cellViews}
            </GridRow>
        );
    }


    render() {
        // Group the restaurants into rows with 2 columns, except for the
        // first article. The first article is treated as a featured article
        let isFirstArticle = true;
        const groupedData = GridRow.groupByRows(this.state.restaurants, 2, () => {
            if (isFirstArticle) {
                isFirstArticle = false;
                return 2;
            }

            return 1;
        });
        return (
            <Screen>
                <NavigationBar
                    //renderLeftComponent={leftButton}
                    renderRightComponent={rightButton}
                    title="All Restaurants (Grid)"

                />
                <ListView
                    data={groupedData}
                    renderRow={this.renderRow}
                />
            </Screen>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onButtonPress: (restaurant) => {
        dispatch(navigatePush({
            key: 'RestaurantsList',
            title: 'Details',
        }, {restaurant}));
    },
    onDetailsButtonPress: (restaurant) => {
        dispatch(navigatePush({
            key: 'RestaurantDetails',
            title: 'Details',
        }, {restaurant}));
    },
});

export default connect(
    undefined,
    mapDispatchToProps
)(RestaurantsGrid);