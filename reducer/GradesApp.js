import remove from 'lodash.remove'
export const ADD_Grade = 'ADD_Grade'
export const DELETE_Grade = 'DELETE_Grade'

let GradeID = 0

//Action
export function addgrade(Grade) {
    return {
        type: ADD_Grade,
        id: GradeID++,
        Grade
    }
}

export function deletegrade(id) {
    return {
        type: DELETE_Grade,
        payload: id
    }
}

// Reducers

const initialState = []

function GradesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_Grade:
            return [
                ...state,
                {
                    id: action.id,
                    Grade: action.Grade
                }
            ]

        case DELETE_Grade:
            const deleteNewArray = remove(state, obj => {
                return obj.id != action.payload
            })

            return deleteNewArray

        default:
            return state
    }

}

export default GradesReducer