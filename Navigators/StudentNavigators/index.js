import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import ViewGrades1 from '../../Screens/InstructorScreens/ViewGrades1'


const StackNavigator = createStackNavigator({
ViewGrades: {
    screen: ViewGrades1
},

},
{
    initialRouteName: 'ViewGrades',
    headerMode : 'none',
    mode: 'modal'
}
)

export default createAppContainer(StackNavigator)