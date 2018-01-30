const defaultState = {
  data: {},
  errorMessage: '',
  isLoading: false
};

export default function weatherReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_CONTENT_REQUEST':
      return {
        ...state,
        isLoading: true
      };

    case 'GET_CONTENT_SUCCESS':
      return {
        ...state,
        data: action.data,
        isLoading: false
      };

    case 'GET_CONTENT_FAILURE':
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false
      };

    default:
      return state;
  }
}
