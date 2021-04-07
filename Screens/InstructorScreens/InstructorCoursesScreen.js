import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import CourseCard from '../../Components/CourseCard';
import Colors from '../../Constants/colors';

export default class InstructorCoursesScreen extends React.Component{

  render(){
    return(
      <ScrollView style={{flex: 1, backgroundColor: Colors.primary_color}}>
        <CourseCard navigation={this.props.navigation} userType={'instructor'}/>
        <CourseCard navigation={this.props.navigation} userType={'instructor'}/>
        <CourseCard navigation={this.props.navigation} userType={'instructor'}/>
        <CourseCard navigation={this.props.navigation} userType={'instructor'}/>
        <CourseCard navigation={this.props.navigation} userType={'instructor'}/>
        <CourseCard navigation={this.props.navigation} userType={'instructor'}/>
      </ScrollView>
    );
  }
} 

