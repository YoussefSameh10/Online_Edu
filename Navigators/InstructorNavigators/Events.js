import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import ViewEvent from '../../Screens/InstructorScreens/ViewEvent'
import AddEvent from '../../Screens/InstructorScreens/AddEvent'

const StackNavigator = createStackNavigator({
    ViewEvent: {
    screen: ViewEvent
},
AddEvent:{
    screen: AddEvent
}
},
{
    initialRouteName: 'ViewEvent',
    headerMode : 'none',
    mode: 'modal'
}
)

export default createAppContainer(StackNavigator)