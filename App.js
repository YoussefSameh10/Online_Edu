import React from 'react'
import { View, StatusBar, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Colors from './Constants/colors'
import LoginNav from './Navigators/LoginNav'
import StudentNav from './Navigators/StudentNavigators/StudentNav'
import InstructorNav from './Navigators/InstructorNavigators/InstructorNav'
import AdminNav from './Navigators/AdminNavigators/AdminNav'

const AppNavigator = createStackNavigator()


export default class App extends React.Component {

  
  render(){
    return (
      <View style={{
        flex: 1,
        }}>
        <StatusBar backgroundColor = {Colors.primary_color}/> 
        <NavigationContainer>
          <AppNavigator.Navigator 
            initialRouteName={'loginNav'} 
            headerMode={'none'}  
          >
              <AppNavigator.Screen 
                name={'loginNav'} 
                component={LoginNav} 
              />   
              <AppNavigator.Screen 
                name={'studentNav'} 
                component={StudentNav} 
              />
              <AppNavigator.Screen 
                name={'instructorNav'} 
                component={InstructorNav} 
              />

              <AppNavigator.Screen 
                name={'adminNav'} 
                component={AdminNav} 
              />
          </AppNavigator.Navigator>
        </NavigationContainer>     
      </View>
      
    );
  }
}


// export default class App extends React.Component {
  
//   state = {
//     users: [],
//     token: '',
//   }
//   componentDidMount(){
    
//     this.fetchUsers()
//   }
//   fetchUsers = async () => {
//     try{    
//       //======================Create User=======================//
//       const response = await fetch('http://192.168.1.8:3000/users', {
//         method: 'POST',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//           name: "student4",
//           code: "student4",
//           email: "student4@gmail.com",
//           password: "student4",
//           role: "student",
//         })
//       })

//       //======================Login=======================//
//       // const response = await fetch('http://192.168.1.8:3000/users/login', {
//       //   method: 'POST',
//       //   headers: {"Content-Type": "application/json"},
//       //   body: JSON.stringify({
//       //     email: "emailadmin@gmail.com",
//       //     password: "24682468",
//       //   })
//       // })
      
//       // const result = await response.json()
      
//       // this.setState({token: result.token})

//       //======================Get Students=======================//
//       // const res = await fetch('http://192.168.1.8:3000/admins/getAllStudents', {
//       //   method: 'GET',
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     "Authorization": "Bearer " + this.state.token,        
//       //   },
//       // })


//       const results = await response.json()
//       console.log(results)
//     } catch (err){
//       console.log(err.message)
      
//     }
//   }
  
//   render(){
//     return(
//       <Text>asdf</Text>
//     )
//   }
// }

