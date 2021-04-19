import React from "react";
import { FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import CustomHeaderButtons from "../components/CustomHeaderButtons";
import PlaceItem from "../components/PlaceItem";

const PlacesListScreen = (props) => {
  const placesList = useSelector((state) => state.places.places);

  return (
    <FlatList
      data={placesList}
      renderItem={(itemData) => (
        <PlaceItem
          onPress={() => {
            props.navigation.navigate("PlaceDetails", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
          title={itemData.item.title}
          address={null}
          image={itemData.item.imageUri}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item
          title="Add"
          iconName="md-add"
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;
