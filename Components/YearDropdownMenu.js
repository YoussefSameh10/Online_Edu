import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

export default class YearDropdownMenu extends React.Component{
  render(){
    return(
      <DropDownPicker
        items={[
          {label: 'Year 0', value: '0',},
          {label: 'Year 1', value: '1', },
          {label: 'Year 2', value: '2', },
          {label: 'Year 3', value: '3', },
          {label: 'Year 4', value: '4', },
        ]}
        //defaultValue={this.state.country}
        placeholder={'Year'}
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