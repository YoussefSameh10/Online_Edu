import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import ViewGrades from '../../Screens/InstructorScreens/ViewGrades'
import AddGrades from '../../Screens/InstructorScreens/AddGrades'

const StackNavigator = createStackNavigator({
ViewGrades: {
    screen: ViewGrades
},
AddGrades:{
    screen: AddGrades
}
},
{
    initialRouteName: 'ViewGrades',
    headerMode : 'none',
    mode: 'modal'
}
)

export default createAppContainer(StackNavigator)