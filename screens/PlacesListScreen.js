import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButtons from "../components/CustomHeaderButtons";
import PlaceItem from "../components/PlaceItem";
import { setPlaces } from "../store/places-action";

const PlacesListScreen = (props) => {
  const placesList = useSelector((state) => state.places.places);

  console.log("Places List", placesList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlaces());
  }, [dispatch]);

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
          address={itemData.item.address}
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
