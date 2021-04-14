import React from 'react'
import {View, StyleSheet} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default class DropdownMenus extends React.Component{
  
  state= {
    year: '0',

  }

  render(){
    return(
      <View flexDirection='row' style = {styles.container}>
        <DropDownPicker
          items={[
            {label: 'Year 0', value: '0',},
            {label: 'Year 1', value: '1', },
            {label: 'Year 2', value: '2', },
            {label: 'Year 3', value: '3', },
            {label: 'Year 4', value: '4', },
          ]}
          defaultValue={'0'}
          onChangeItem={item => {
            this.setState({year: item.value})
          }}
          placeholder={'Year'}
          style={styles.menu}
          itemStyle={styles.item}
          dropDownStyle={styles.dropdown}
          containerStyle={styles.box}
        />

        <DropDownPicker
          items={[
            {label: 'All', value: 'All',},
            {label: 'Electrical', value: 'Electrical',},
            {label: 'Mechanical', value: 'Mechanical', },
            {label: 'Architecture', value: 'Architecture', },
            {label: 'Civil', value: 'Civil', },
            
          ]}
          disabled={this.state.year === '0' ? true : false}
          defaultValue={'All'}
          onChangeItem={item => {}}
          placeholder={'Department'}
          style={styles.menu}
          itemStyle={styles.item}
          dropDownStyle={styles.dropdown}
          containerStyle={styles.box}
        />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {justifyContent: 'space-around'},
  menu: {backgroundColor: '#fafafa',},
  item: {justifyContent: 'flex-start'},
  dropdown: {backgroundColor: '#fafafa',},
  box: { width: '45%', height: 40}
});
