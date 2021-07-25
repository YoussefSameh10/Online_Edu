import React from 'react'
import {FlatList} from 'react-native'
import Toast from 'react-native-simple-toast';
import CourseCard from '../../Components/CourseCard';
import Colors from '../../Constants/colors';
import { url } from '../../Constants/numbers';
import { compareByCourseYearAndName } from '../../Constants/Functions';


export default class InstructorCoursesScreen extends React.Component{

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
      courseName={this.state.courses[index].name}
      courseCode={this.state.courses[index].code} 
      user={this.props.user}
      userToken={this.props.userToken}
      userType={'instructor'} 
      index={index}
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
      const result = await response.json()
      console.log(result)
      if(response.status === 200){
        this.setState({courses: [...result.sort(compareByCourseYearAndName)]})
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

