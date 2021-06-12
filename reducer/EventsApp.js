import remove from 'lodash.remove'
export const ADD_Event = 'ADD_Event'
export const DELETE_Event = 'DELETE_Event'

let EventID = 0

//Action
export function addevent(Event) {
    return {
        type: ADD_Event,
        id: EventID++,
        Event
    }
}

export function deleteevent(id) {
    return {
        type: DELETE_Event,
        payload: id
    }
}

// Reducers

const initialState = []

function EventsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_Event:
            return [
                ...state,
                {
                    id: action.id,
                    Event: action.Event
                }
            ]

        case DELETE_Event:
            const deleteNewArray = remove(state, obj => {
                return obj.id != action.payload
            })

            return deleteNewArray

        default:
            return state
    }

}

export default EventsReducer