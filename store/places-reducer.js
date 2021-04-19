import Place from "../models/Place";
import { ADD_PLACE, SET_PLACES } from "./places-action";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      const data = action.places.map(
        (place) => new Place(place.id.toString(), place.title, place.imageUri)
      );
      console.log("=>", data);
      return {
        places: action.places.map(
          (place) => new Place(place.id.toString(), place.title, place.imageUri)
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeDetails.id.toString(),
        action.placeDetails.title,
        action.placeDetails.image
      );
      return {
        places: [...state.places, newPlace],
      };
    default:
      return state;
  }
};
