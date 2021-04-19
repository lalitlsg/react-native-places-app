import Place from "../models/Place";
import { ADD_PLACE } from "./places-action";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        new Date().toString(),
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
