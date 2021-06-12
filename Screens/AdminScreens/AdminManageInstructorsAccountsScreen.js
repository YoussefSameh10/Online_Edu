import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import UsersTable from '../../Components/UsersTable';
import Colors from '../../Constants/colors';
import { compareByName } from '../../Constants/Functions';
import { url } from '../../Constants/numbers';

export default class AdminManageInstructorsAccountsScreen extends React.Component{
  
  state={
    searchInput: '',
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
        `${url}/admins/getAllInstructors`, {
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
    this.setState({searchInput: input})
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

  deleteInstructor = (code) => {
    this.setState({
        instructors: [...this.state.instructors.filter(instructor => instructor.code !== code)]
      },
      this.init
    )
  }

  render(){

    return(
      <View style={styles.container}>
        <View style={styles.fixedView}>
          <TextInput 
            placeholder={'Search'}
            value={this.state.searchInput}
            onChangeText={this.handleSearch}
            style={styles.searchBox}
          />
          <View style={styles.row}>
            <Text style={styles.counter}>
              {`Number Of Shown Instructors: ${this.state.instructors.length}`}
            </Text>
            <TouchableOpacity
              onPress={this.getInstructors}
              style={styles.refreshIcon}
            >
              <Icon 
                name='refresh'
                color={'#fff'}  
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <UsersTable 
          userType={'Instructor'}
          attributes={this.state.attributes} 
          usersShownData={this.state.instructorsShownData}
          users={this.state.instructors}
          userToken={this.props.userToken}
          navigation={this.props.navigation} 
          deleteUser={this.deleteInstructor}
          refresh={this.getInstructors}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff'},
  fixedView: {marginBottom: 20},
  searchBox: {alignSelf: 'center', borderBottomWidth: 1, width: '100%', paddingLeft: 8},
  row: {flexDirection: 'row', marginTop: 20, alignItems: 'center' ,justifyContent: 'space-between'},
  counter: {fontSize: 16, color: '#000'},
  refreshIcon: {backgroundColor: Colors.primary_color, borderRadius: 40, width: 30, height: 30, justifyContent: 'center'}
});
