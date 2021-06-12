import React, {useState} from 'react';
import {View, TouchableOpacity,Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {FAB, List } from 'react-native-paper'
import {Card} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { addevent, deleteevent } from '../../reducer/EventsApp'
import moment from 'moment';
import { NavigationStackConfig } from 'react-navigation-stack';
import { State } from 'react-native-gesture-handler';


function ViewEvent({ navigation }) {
let arr;
  const timeToString = (time) => {
    const date = new Date(time);
      return date.toISOString().split('T')[0];
    };
    
  const Events = useSelector(state => state)
  const dispatch = useDispatch()  
    const addEvent = (Event) => {
    console.log(Event)
    dispatch(addevent(Event))
}
  const [items, setItems] = useState({});
  
  const loadItems = (day) => {
    
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
            items[strTime].push({
              name:'No Item'+'\n'+ strTime,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
        }
      }
      const newItems ={};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(items);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>

);
  };

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ViewEvent;