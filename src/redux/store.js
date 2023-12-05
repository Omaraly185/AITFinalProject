import { legacy_createStore as createStore } from "redux";

const initialState = {
  bookingForm: {
    name: "",
    phoneNumber: "",
    email: "",
    // message: '',
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_FORM_DATA":
      return { ...state, bookingForm: action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
