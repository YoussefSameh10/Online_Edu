import React from 'react'
import {createBottomTabNavigator, useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import AdminManageStudentsAccountsScreen from '../../Screens/AdminScreens/AdminManageStudentsAccountsScreen';
import AdminCreateStudentsAccountsScreen from '../../Screens/AdminScreens/AdminCreateStudentsAccountsScreen';
import Colors from '../../Constants/colors';
import { Icon } from 'react-native-elements';
import { url } from '../../Constants/numbers';
import { compareByName } from '../../Constants/Functions';

const AdminManageStudentsAccountsNavigator = createBottomTabNavigator()

export default class AdminManageStudentsAccountsNav extends React.Component{


  state={
    searchInput: '',
    year: '0',
    studentsBasicData: [],
    studentsShownData: [],
    students: [],
    studentsByYear: [],
    shownStudents: [],
    loading: true,
  }

  componentDidMount(){
    this.getStudents()
  }

  init = () => {
    this.setState({
      studentsByYear: [...this.state.students.filter((student) => {
        if(this.state.year==='0'){
          return true
        }
        else{
          return this.state.year===student.year
        }
      })]
    }, () => {
      const arr = []
      let obj = {}
      this.state.studentsByYear.map((item) => {
        Object.keys(item).map((key) => {
          key === 'name' || key === 'code' || key === 'year' ? obj[key] = item[key]
          : null
        })
        arr.push(obj)
        obj={}
      })
      this.setState({
        studentsShownData: [...arr.sort(compareByName)], 
        studentsBasicData: [...arr.sort(compareByName)],
        students: [...this.state.students.sort(compareByName)],
        studentsByYear: [...this.state.studentsByYear.sort(compareByName)],
        shownStudents: [...this.state.studentsByYear.sort(compareByName)]
      })
    })
    
  }

  getStudents = async () => {
    try{
      this.setState({loading: true})
      const response = await fetch(
        `${url}/admins/getAllStudents`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,
        }
      })
      
      const results = await response.json()
      if(response.status === 200){
        this.setState({students: [...results]}, this.init)
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }
      else{
        this.setState({students: []}, this.init)
        Toast.show(results)
      }
      this.setState({loading: false})
    } catch (err){
      this.setState({loading: false})
      Toast.show('An error occured. Please try again later')
    }
  }

  handleSearch = input => {
    this.setState({searchInput: input})
    if(input === null){
      this.setState({
        studentsShownData: this.state.studentsBasicData,
        shownStudents: this.state.students
      })
    } else{
      this.setState({
        studentsShownData: [...this.state.studentsBasicData
          .filter(function(item) {
            return !(item.name.indexOf(input) && item.code.indexOf(input))
          })],
        shownStudents: [...this.state.studentsByYear
          .filter(function(item) {
            return !(item.name.indexOf(input) && item.code.indexOf(input))
        })],
      })
    }
  }

  filterByYear = (year) => {
    this.init()
    this.setState({
      studentsShownData: [...this.state.studentsBasicData.filter(function(student){
        return student.year===year
      })],
      studentsByYear: [...this.state.students.filter(function(student){
        if(year === '0'){
          return true
        }
        else{
          return student.year===year
        }
      })]
    }, () => {
      this.setState({
        shownStudents: [...this.state.studentsByYear
          .filter(function(student) {
            return student.year === year
        })],
      })
    })
  }

  handleYearChange = (year) => {
    this.setState({loading: true})
    if(year!=='0'){
      this.setState({year: year, searchInput: ''}, () => this.filterByYear(year))
    }
    else{
      this.setState({year: year, searchInput: ''},this.getStudents)
    }
    this.setState({loading: false})
  }
  
  deleteStudent = (code) => {
    this.setState({
        students: [...this.state.students.filter(function(student){return student.code !== code})],
      },
      this.getStudents
    )

  }

  render(){
    return(
      <AdminManageStudentsAccountsNavigator.Navigator
        initialRouteName='adminManageStudentsAccountsScreen'
        backBehavior='none'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13},
          keyboardHidesTabBar: 'true',
        }}
      >
        <AdminManageStudentsAccountsNavigator.Screen 
          name='adminManageStudentsAccountsScreen'
          children={() => 
            <AdminManageStudentsAccountsScreen 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
              handleSearch={this.handleSearch}
              handleYearChange={this.handleYearChange}
              deleteStudent={this.deleteStudent}
              getStudents={this.getStudents}
              searchInput={this.state.searchInput}
              year={this.state.year}
              studentsShownData={this.state.studentsShownData}
              studentsByYear={this.state.studentsByYear}
              shownStudents={this.state.shownStudents}
              loading={this.state.loading}
            />
          }
          options={{
            title: 'Students List',
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='list'
                type='font-awesome-5' 
                color={color} 
                size={size} 
              />
            ),
          }}
        />

        <AdminManageStudentsAccountsNavigator.Screen 
          name='adminCreateStudentsAccountsScreen'
          children={() => 
            <AdminCreateStudentsAccountsScreen 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
              getStudents={this.getStudents}
            />
          }
          options={{
            title: 'Create New Accounts',
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='plus'
                type='font-awesome-5' 
                color={color} 
                size={size} 
              />
            ),
          }}
        />
      </AdminManageStudentsAccountsNavigator.Navigator>
    );
  }
}