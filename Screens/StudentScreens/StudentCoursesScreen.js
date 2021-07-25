import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {FlatList} from 'react-native'
import Toast from 'react-native-simple-toast';
import CourseCard from '../../Components/CourseCard';
import Colors from '../../Constants/colors';
import { url } from '../../Constants/numbers';
import { compareByCourseName } from '../../Constants/Functions';

export default class StudentCoursesScreen extends React.Component{

  state = {
    courses: [],
    loading: true,
  }

  componentDidMount(){
    this.getCourses()
  } 

  renderItem = ({index}) => (
    <CourseCard 
      navigation={this.props.navigation} 
      courseName={this.state.courses[index].course_name}
      courseCode={this.state.courses[index].course_code} 
      user={this.props.user}
      userToken={this.props.userToken}
      userType={'student'} 
      index={index}
    />
  )


  getCourses = async() => {
    try{
      const response = await fetch(`${url}/users/getEnrolledCourses/${this.props.user.code}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
      })
      const result = await response.json()
      console.log(result)
      if(response.status === 200){
        this.setState({courses: [...result.sort(compareByCourseName)]})
      }
      else if(response.status === 500){
        Toast.show(`Server error`)
      }
      else{
        Toast.show(result)
      }
      this.setState({loading: false})
    } catch(e){
      this.setState({loading: false})
      Toast.show('An error occured. Please try again later')
    }
  }

  render(){
    return(
      <FlatList 
          data={this.state.courses}
          renderItem={this.renderItem}
          keyExtractor={item => item.code}
          style={{flex: 1, backgroundColor: '#eee'}}
      />

      
    );
  }
} 


 

