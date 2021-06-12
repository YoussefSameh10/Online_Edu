import React from 'react'
import {FlatList} from 'react-native'
import Toast from 'react-native-simple-toast';
import CourseCard from '../../Components/CourseCard';
import Colors from '../../Constants/colors';
import { url } from '../../Constants/numbers';

export default class InstructorCoursesScreen extends React.Component{

  state = {
    courses: []
  }

  componentDidMount(){
    this.getCourses()
  } 

  renderItem = ({index}) => (
    <CourseCard 
      navigation={this.props.navigation} 
      courseName={this.state.courses[index].name}
      courseCode={this.state.courses[index].code} 
      user={this.props.user}
      userToken={this.props.userToken}
      userType={'instructor'} 
    />
  )


  getCourses = async() => {
    try{
      const response = await fetch(`${url}/instructors/InstructorCourses`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
      })
      if(response.status === 500){
        Toast.show(`Can't View Your Courses`)
      }

      if(response.status === 403){
        Toast.show(`Unauthorized Action`)
      }
      else{
        const result = await response.json()
        this.setState({courses: [...result]})
      }
      
    } catch(e){
      console.log(e.message)
    }
  }

  render(){
    return(
      <FlatList 
          data={this.state.courses}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          style={{flex: 1, backgroundColor: Colors.primary_color}}
      />
      
    );
  }
} 

