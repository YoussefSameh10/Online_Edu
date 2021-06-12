import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { TextInput, } from 'react-native-gesture-handler';
import DropdownMenus from '../../Components/DropdownMenus';
import UsersTable from '../../Components/UsersTable';
import Colors from '../../Constants/colors';
import { compareByName } from '../../Constants/Functions';
import { url } from '../../Constants/numbers';

export default class AdminManageAdminsAccountsScreen extends React.Component{
  
  state={
    searchInput: '',
    attributes: ['NAME', 'CODE', ],
    adminsBasicData: [],
    adminsShownData: [],
    admins: [],
  }

  componentDidMount(){
    this.getAdmins()
  }

  init = () => {
    const arr = []
    let obj = {}
    this.state.admins.map((item) => {
      Object.keys(item).map((key) => {
        key === 'name' || key === 'code' || key === 'createdAt' ? obj[key] = item[key]
        : null
      })
      arr.push(obj)
      obj={}
    })
    this.setState({
      adminsShownData: [...arr.sort(compareByName)], 
      adminsBasicData: [...arr.sort(compareByName)],
      admins: [...this.state.admins.sort(compareByName)],
    })
  }

  getAdmins = async () => {
    try{
      const response = await fetch(
        `${url}/admins/getAdmins`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        }
      })
      
      const results = await response.json()
      if(response.status === 200){
        this.setState({admins: results}, this.init)
      }
      else if(response.status === 404){
        this.setState({admins: []}, this.init)
        Toast.show(results)
      }
      else if(response.status === 403){
        this.setState({admins: []}, this.init)
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
    if(input === null){
      this.setState({
        adminsShownData: this.state.adminsBasicData
      })
    } else{
      this.setState({
        adminsShownData: this.state.adminsBasicData
        .filter(function(item) {
          return !(item.name.indexOf(input) && item.code.indexOf(input))
        })
      })
    }
  }

  deleteAdmin = (code) => {
    this.setState({
        admins: [...this.state.admins.filter(admin => admin.code !== code)]
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
              {`Number Of Shown Admins: ${this.state.admins.length}`}
            </Text>
            <TouchableOpacity
              onPress={this.getAdmins}
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
          userType={'Admin'}
          attributes={this.state.attributes} 
          usersShownData={this.state.adminsShownData} 
          users={this.state.admins}
          userToken={this.props.userToken}
          navigation={this.props.navigation} 
          deleteUser={this.deleteAdmin}
          refresh={this.getAdmins}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff',},
  fixedView: {marginBottom: 20},
  searchBox: {alignSelf: 'center', borderBottomWidth: 1, width: '100%', paddingLeft: 8},
  row: {flexDirection: 'row', marginTop: 20, alignItems: 'center' ,justifyContent: 'space-between'},
  counter: {fontSize: 16, color: '#000'},
  refreshIcon: {backgroundColor: Colors.primary_color, borderRadius: 40, width: 30, height: 30, justifyContent: 'center'}
});
