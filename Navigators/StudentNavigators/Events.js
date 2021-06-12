import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import ViewEventStudent from '../../Screens/InstructorScreens/ViewEventStudent'


const StackNavigator = createStackNavigator({
    ViewEventStudent: {
    screen: ViewEventStudent
}
},
{
    initialRouteName: 'ViewEventStudent',
    headerMode : 'none',
    mode: 'modal'
}
)

export default createAppContainer(StackNavigator)