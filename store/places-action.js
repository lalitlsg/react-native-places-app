import * as FileSystem from "expo-file-system";
import { fetchPlaces, insertPlace } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const setPlaces = () => {
  return async (dispatch) => {
    try {
      const result = await fetchPlaces();
      dispatch({ type: SET_PLACES, places: result.rows._array });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addPlace = (title, imageUri) => {
  return async (dispatch) => {
    const fileName = imageUri.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
      const dbInsert = await insertPlace(
        title,
        newPath,
        "Dummy Address",
        0.1,
        0.15
      );
      dispatch({
        type: ADD_PLACE,
        placeDetails: {
          id: dbInsert.insertId,
          title: title,
          image: newPath,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
