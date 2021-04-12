import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

export default class YearDropdownMenu extends React.Component{
  render(){
    return(
      <DropDownPicker
        items={[
          {label: 'Electrical', value: '0',},
          {label: 'Mechanical', value: '1', },
          {label: 'Architecture', value: '2', },
          {label: 'Civil', value: '3', },
          
        ]}
        //defaultValue={this.state.country}
        placeholder={'Department'}
        containerStyle={{ width: '45%', height: 40}}
        style={{backgroundColor: '#fafafa', }}
        itemStyle={{
            justifyContent: 'flex-start'
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={item => this.setState({
            //country: item.value
        })}
      />
    );
  }
}

