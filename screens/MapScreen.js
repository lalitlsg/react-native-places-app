import React, { useState, useCallback, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import Colors from "../constants/Colors";

const MapScreen = (props) => {
  const readonly = props.navigation.getParam("readonly");
  const initialLocation = props.navigation.getParam("initialLocation");

  const mapRegion = {
    latitude: initialLocation ? initialLocation.latitude : 20.4388239,
    longitude: initialLocation ? initialLocation.longitude : 78.73965,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  console.log(mapRegion);

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinate;
  if (selectedLocation) {
    markerCoordinate = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  }

  const saveLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate("NewPlace", {
      locationDetails: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: saveLocationHandler });
  }, [saveLocationHandler]);

  return (
    <MapView
      region={mapRegion}
      style={styles.screen}
      onPress={selectLocationHandler}
    >
      {markerCoordinate && (
        <Marker title="Picked Location" coordinate={markerCoordinate}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveLocation = navData.navigation.getParam("saveLocation");
  const readonly = navData.navigation.getParam("readonly");
  if (readonly) {
    return {};
  }
  return {
    headerRight: () => (
      <AppButton
        onPress={saveLocation}
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
      >
        Save
      </AppButton>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonStyle: {
    marginRight: 20,
  },
  textStyle: {
    fontWeight: "bold",
    color: Colors.primary,
  },
});

export default MapScreen;
