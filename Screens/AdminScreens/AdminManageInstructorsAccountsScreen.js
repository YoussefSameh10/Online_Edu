import React from 'react'
import { StyleSheet, View, Button } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import DropdownMenus from '../../Components/DropdownMenus';
import UsersTable from '../../Components/UsersTable';

export default class AdminManageInstructorsAccountsScreen extends React.Component{
  
  state={
    attributes: ['NAME', 'CODE', ],
    instructorsBasicData: [
      ['asdfg', '1234567890', ''],
      ['axdrew', '123490', ''],
      ['jygvf', '1234567890', ''],
      ['xcvgtgvfd', '1234567890', ''],
      ['ryhfcnj', '1234567890', ''],
      ['efyvuw', '1234567890', ''],
      ['wbvhekfwku', '1234567890', ''],
      ['ewbrefvwe', '1234567890', ''],
      ['etnebwre', '1234567890', ''],
      ['wrnetbgdv', '1234567890', ''],
      ['asvfghtrtgfd', '1234567890', ''],
      ['ehtrgvfeeg', '1234567890', ''],
      ['ymrtndgbf', '1234567890', ''],
      ['sdvfthgf', '1234567890', ''],
      ['bgfdfgfdrtyj', '1234567890', ''],
      ['sfvreuyjtrd', '1234567890', ''],
      ['rhnrtbdgvfd', '1234567890', ''],
      ['htentbgrdvc', '1234567890', ''],
      ['gtwgefvsad', '1234567890', ''],
      ['vewdasxa', '1234567890', ''],
      ['zsertgvcds', '1234567890', ''],
      ['asdfewvfscx', '1234567890', ''],
      ['jtrhbdgf', '1234567890', ''],
      ['eyrbgsfvdc', '1234567890', ''],
    ],

    instructorsShownData: [
      ['asdfg', '1234567890', ''],
      ['axdrew', '123490', ''],
      ['jygvf', '1234567890', ''],
      ['xcvgtgvfd', '1234567890', ''],
      ['ryhfcnj', '1234567890', ''],
      ['efyvuw', '1234567890', ''],
      ['wbvhekfwku', '1234567890', ''],
      ['ewbrefvwe', '1234567890', ''],
      ['etnebwre', '1234567890', ''],
      ['wrnetbgdv', '1234567890', ''],
      ['asvfghtrtgfd', '1234567890', ''],
      ['ehtrgvfeeg', '1234567890', ''],
      ['ymrtndgbf', '1234567890', ''],
      ['sdvfthgf', '1234567890', ''],
      ['bgfdfgfdrtyj', '1234567890', ''],
      ['sfvreuyjtrd', '1234567890', ''],
      ['rhnrtbdgvfd', '1234567890', ''],
      ['htentbgrdvc', '1234567890', ''],
      ['gtwgefvsad', '1234567890', ''],
      ['vewdasxa', '1234567890', ''],
      ['zsertgvcds', '1234567890', ''],
      ['asdfewvfscx', '1234567890', ''],
      ['jtrhbdgf', '1234567890', ''],
      ['eyrbgsfvdc', '1234567890', ''],
    ],
  }

  componentDidMount(){
    this.setState({instructorsShownData: [...this.state.instructorsShownData.sort()]})
  }

  handleSearch = input => {
    if(input === ''){
      this.setState({
        instructorsShownData: this.state.instructorsBasicData
      })
    } else{
      this.setState({
        instructorsShownData: this.state.instructorsBasicData.filter(function(item) {return !item[0].indexOf(input)})
      })
    }
  }

  render(){

    return(
      <View style={styles.container}>
        <View style={styles.fixedView}>
          <TextInput 
            placeholder={'Search'}
            onChangeText={this.handleSearch}
            style={styles.searchBox}
          />
          <DropdownMenus />
        </View>
        
        <UsersTable 
          userType={'Instructor'}
          attributes={this.state.attributes} 
          usersShownData={this.state.instructorsShownData} 
          navigation={this.props.navigation} 
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  fixedView: {marginBottom: 20},
  searchBox: {alignSelf: 'center', marginBottom: 16, borderBottomWidth: 1, width: '90%', paddingLeft: 8},
});
