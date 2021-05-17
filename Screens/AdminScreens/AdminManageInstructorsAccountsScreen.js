import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import UsersTable from '../../Components/UsersTable';
import { compareByName } from '../../Constants/Functions';

export default class AdminManageInstructorsAccountsScreen extends React.Component{
  
  state={
    attributes: ['NAME', 'CODE', ],
    instructorsBasicData: [],
    instructorsShownData: [],
    instructors: [],
  }

  componentDidMount(){
    this.getInstructors()
  }

  init = () => {
    const arr = []
    let obj = {}
    this.state.instructors.map((item) => {
      Object.keys(item).map((key) => {
        key === 'name' || key === 'code' || key === 'role' ? obj[key] = item[key]
        : null
      })
      arr.push(obj)
      obj={}
    })
    this.setState({
      instructorsShownData: [...arr.sort(compareByName)], 
      instructorsBasicData: [...arr.sort(compareByName)],
      instructors: [...this.state.instructors.sort(compareByName)],
    })
  }


  getInstructors = async () => {
    try{
      const response = await fetch(
        `http://192.168.1.8:3000/admins/getAllInstructors`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        }
      })
      
      const results = await response.json()
      if(response.status === 200){
        this.setState({instructors: results}, this.init)
      }
      else if(response.status === 404){
        this.setState({instructors: []}, this.init)
        Toast.show(results)
      }
      else if(response.status === 403){
        this.setState({instructors: []}, this.init)
        Toast.show('Unauthorithed')
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }
      

    } catch (err){
      console.log(err.message)
    }
  }


  handleSearch = input => {
    if(input === ''){
      this.setState({
        instructorsShownData: this.state.instructorsBasicData
      })
    } else{
      this.setState({
        instructorsShownData: this.state.instructorsBasicData
          .filter(function(item) {
            return !(item.name.indexOf(input) && item.code.indexOf(input))
          })
      })
    }
  }

  render(){

    return(
      <View style={[styles.container, {paddingBottom: this.props.tabBarHeight + 30}]}>
        <View style={styles.fixedView}>
          <TextInput 
            placeholder={'Search'}
            onChangeText={this.handleSearch}
            style={styles.searchBox}
          />
          <Text style={styles.counter}>
            {`Number Of Shown Instructors: ${this.state.instructors.length}`}
          </Text>
        </View>
        
        <UsersTable 
          userType={'Instructor'}
          attributes={this.state.attributes} 
          usersShownData={this.state.instructorsShownData}
          users={this.state.instructors}
          navigation={this.props.navigation} 
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff'},
  fixedView: {marginBottom: 20},
  searchBox: {alignSelf: 'center', borderBottomWidth: 1, width: '90%', paddingLeft: 8},
  counter: {fontSize: 16, marginTop: 20},
});
