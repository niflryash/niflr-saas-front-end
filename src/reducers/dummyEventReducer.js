import {

    FETCH__DUMMY_EVENTS_LIST,
    FETCH__DUMMY_EVENTS_LIST_SUCCESS,
    FETCH__DUMMY_EVENTS_LIST_FAILURE,
    FETCH__DUMMY_EVENT_DETAILS,
    FETCH__DUMMY_EVENT_DETAILS_SUCCESS,
    FETCH__DUMMY_EVENT_DETAILS_FAILURE,
    POST__DUMMY_EVENT_DETAILS,
    POST__DUMMY_EVENT_DETAILS_SUCCESS,
    POST__DUMMY_EVENT_DETAILS_FAILURE,
    PUT__DUMMY_EVENT_DETAILS,
    PUT__DUMMY_EVENT_DETAILS_SUCCESS,
    PUT__DUMMY_EVENT_DETAILS_FAILURE,
    CLEAR__DUMMY_EVENT_DETAILS,
    ADD__DUMMY_EVENT,
    REMOVE__DUMMY_EVENT,
    CLEAR__DUMMY_EVENTS,
    SAVE__DUMMY_EVENTS,
    RESET_DUMMY_EVENTS,
    IS_DUMMY_EVENT_CHECKED,
    DUMMY_EVENTS_CONFIRMED
  } from '../types/index';
  
  const DATA = {
    dummyEvent: {},
    dummyEvents: {
      dummyEvents: [],
    },
    isLoading: false,
    error: false,
    status: '',
  };
  
  export default (state = DATA, action) => {
    // console.log("reducer testing",action)
    switch (action.type) {
      case FETCH__DUMMY_EVENT_DETAILS_SUCCESS:
        // console.log("fetch dummy event success")
        return { ...state, isLoading: action.isLoading, dummyEvent: action.payload };
      case FETCH__DUMMY_EVENTS_LIST_SUCCESS:
        // console.log("fetch  dummy event list success",action.payload)
        return { ...state, isLoading: action.isLoading, dummyEvents:action.payload };
      // case PUT__DUMMY_EVENT_DETAILS_SUCCESS:
      //   break
      case IS_DUMMY_EVENT_CHECKED:
        {
          const updatedEvents = state.dummyEvents.dummyEvents.map((event) => {
              if (event.id === action.payload) {
                return { ...event, status: "checked" };
              }
              return event;
          });
          return {
              ...state,
              dummyEvents: { ...state.dummyEvents, dummyEvents: updatedEvents },
          };
        }

      case ADD__DUMMY_EVENT:
        {
          
        // const { SKU, Quantity, TicketId, Status } = action.payload;
        const updatedDummyEvents = [...state.dummyEvents.dummyEvents, action.payload];
        // console.log("checking dummy event  payloads", updatedDummyEvents )
        return { ...state, 
          dummyEvents:{...state.dummyEvents,
                        dummyEvents: updatedDummyEvents} };}
      case REMOVE__DUMMY_EVENT:
        {
          const index = state.dummyEvents.dummyEvents.findIndex((item) => item.id === action.payload.id);
        const newDummyEvents = [...state.dummyEvents.dummyEvents];
        newDummyEvents.splice(index, 1);
        return { ...state, 
            dummyEvents: {...state.dummyEvents,
              dummyEvents: newDummyEvents} };
      }
      case  CLEAR__DUMMY_EVENTS:
        return { ...state, 
          dummyEvents:{...state.dummyEvents,dummyEvents: []
        } , 
        status: action.payload };
        
      case SAVE__DUMMY_EVENTS:
        // console.log("checking save status", state.dummyEvents)
        {
          const updatedEvents = state.dummyEvents.dummyEvents.map((event) => {

            // console.log("checking save status", event)
            if (event.status === 'checked') 
            {
            return { ...event, status: 'saved' };
            }
          return event;
        });
        // console.log("checking save status", updatedEvents)
        return {
            ...state,
            dummyEvents: { ...state.dummyEvents, dummyEvents: updatedEvents },
          };
        }
        case DUMMY_EVENTS_CONFIRMED:
                  {
                    const updatedEvents = state.dummyEvents.dummyEvents.map((event) => {
                    if (event.status === 'saved') {
                      return { ...event, status: 'confirmed' };
                    }
                    return event;
                  });
                  return {
                      ...state,
                      dummyEvents: { ...state.dummyEvents, dummyEvents: updatedEvents },
                    };
                  }
        case RESET_DUMMY_EVENTS:
              {
                const updatedEvents = state.dummyEvents.dummyEvents.map((event) => {
                      return { ...event, status: "processing" };
                });
                return {
                    ...state,
                    dummyEvents: { ...state.dummyEvents, dummyEvents: updatedEvents },
                };
              }
      default:
        return state;
    }
  };
  