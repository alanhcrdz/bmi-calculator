import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  
  

} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import {MaterialCommunityIcons} from 'expo-vector-icons'


//importing colors patterns
import Colors from './constants/colors';

import MainButton from './components/MainButton';




//fetching fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'Oswald-Regular': require('./assets/fonts/Oswald-Regular.ttf'),
    'Oswald-Bold': require('./assets/fonts/Oswald-Bold.ttf')
  });
};




export default function App() {

  //state Hook
  const [fontLoaded, setFontLoaded] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentBmi, setCurrentBmi] = useState();
  const [indexText, setIndexText] = useState('');
  const [currText, setCurrText] = useState('');

 
  


  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    )
  }

  const resetInputHandler = () => {
      Keyboard.dismiss();
      
  }

  const bmiHanlder = () => {
    const formula = currentWeight / currentHeight / currentHeight * 10000
    setCurrentBmi(formula.toFixed(1));
      formula < 18.5 ? setIndexText('Underweight') :
      formula >= 18.5 && formula <= 24.9 ? setIndexText('Normal Weight'):
      formula >= 25 && formula <= 29 ? setIndexText('Overweight') :
      formula > 30 ? setIndexText('Obese') : '';
      setCurrText('Your BMI');


      //chack input's value condition
      if(currentHeight <= 130 || currentWeight <= 30 || currentHeight > 199 || currentWeight > 150){
        Alert.alert(
          'Invalid input!',
          'Please check your input value',
          [{text: 'Got it', style:'destructive', onPress: resetInputHandler}]
        );
        setCurrText('');
        setIndexText('');
        setCurrentBmi('');
      };
  }
  

  







  return (
 
    
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}
    >

      <View style={styles.screen} >
       
        
        

  {/*     <Text style={{
          textAlign: 'center',
          color:  '#fff',
          fontFamily: 'Oswald-Bold',
          fontSize: 30
        }}>BMI Calculator</Text> */}



        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.inputText}>Your height(cm):</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g:160"
              keyboardType="numeric"
              placeholderTextColor="#ccc"
              //autoCapitalize="words" 
              maxLength={3}
              onChangeText={(currHeight) => { 
              setCurrentHeight(currHeight)}}
              defaultValue={''}


            />
          </View>

          <View>
            <Text style={styles.inputText}>Your weight(kg):</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g:70"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              maxLength={3}
              //autoCapitalize="words"
              onChangeText={(currWeight) => { setCurrentWeight(currWeight) }}
              defaultValue={''} />
          </View>
        </View>

      {/*   <Text style={{
          textAlign: 'center',
          color: '#fff',
          fontFamily: 'Oswald-Bold',
          fontSize: 22
        }}>Gender</Text>

        <View style={styles.iconsContainer}>

        <TouchableOpacity style={styles.imgCircle}><Image source={require('./assets/male.png')}  /></TouchableOpacity>

        <View style={styles.imgCircle}><Image source={require('./assets/female.png')} /></View>
         
        </View> */}
       

        <MainButton 
        onPress={bmiHanlder}>Calculate BMI
        </MainButton>

       

        <Text style={{
          textAlign: 'center',
          color:  '#fff',
          fontFamily: 'Oswald-Bold',
          fontSize: 22
        }}>{currText}</Text>

        <Text style={{
          textAlign: 'center',
          color: '#fff',
          fontFamily: 'Oswald-Bold',
          fontSize: 22
        }}>{currentBmi}</Text>

        <Text style={{
          textAlign: 'center',
          color: '#fff',
          fontFamily: 'Oswald-Bold',
          fontSize: 22
        }}>{indexText}</Text>

       {/*  <MainButton>
          <MaterialCommunityIcons name="restart" size={24} color="#fff" />
        </MainButton> */}
      </View>
    </TouchableWithoutFeedback>
    

  );

}

 /*  Navigation.navigationOptions = {
    headerTitle: 'BMI Calculator'
  } */


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center'
  },

  inputText: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'Oswald-Regular'

  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
    marginTop: 40

  },
  input: {
    width: '50%',
    color:'#fff',
    fontFamily: 'Oswald-Regular',
    fontSize: 18,
    minWidth: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent,
  },
  /*   iconsContainer: {
  image: {
    width: "100%",
    height: '100%'
  },
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  imgCircle: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: '#34495e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e'
  }, */

});
