import {createStore} from 'redux'
import EventsReducer from './EventsApp'

const storeEvent = createStore(EventsReducer)

export default storeEvent
