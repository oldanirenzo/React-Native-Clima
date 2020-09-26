import React, {useState} from 'react';
import {
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  View,
  Text,
  Animated,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Formulario = ({busqueda, setBusqueda, setConsultar}) => {
  const [animacionBoton] = useState(new Animated.Value(1));

  const {pais, ciudad} = busqueda;

  const animacionEntrada = () => {
    Animated.spring(animacionBoton, {
      toValue: 0.75,
      useNativeDriver: true,
    }).start();
  };
  const animacionSalida = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };
  const estiloAnimacion = {
    transform: [{scale: animacionBoton}],
  };
  const buscarPais = (pais) => {
    setBusqueda({...busqueda, pais});
  };
  const consultarClima = () => {
    if (pais.trim() === '' || ciudad.trim() === '') {
      mostrarAlerta();
      return;
    }
    setConsultar(true);
  };
  const mostrarAlerta = () => {
    Alert.alert('Error', 'Agrega una ciudad y pais para la busqueda', [
      {text: 'Entendido'},
    ]);
  };

  return (
    <>
      <View>
        <View>
          <TextInput
            value={ciudad}
            style={styles.input}
            onChangeText={(ciudad) => setBusqueda({...busqueda, ciudad})}
            placeholder="Ciudad"
            placeholderTextColor="#666"
          />
        </View>
        <View>
          <DropDownPicker
            items={[
              {label: 'Argentina', value: 'AR'},
              {label: 'Estados Unidos', value: 'US'},
              {label: 'Mexico', value: 'MX'},
              {label: 'Chile', value: 'CH'},
              {label: 'Colombia', value: 'CO'},
              {label: 'España', value: 'ES'},
              {label: 'Peru', value: 'PE'},
            ]}
            defaultValue={pais}
            placeholder="Seleccione un pais"
            containerStyle={{height: 50}}
            style={{backgroundColor: '#FFF', padding: 10}}
            dropDownStyle={{backgroundColor: '#FFF'}}
            itemStyle={{justifyContent: 'center'}}
            onChangeItem={({value}) => buscarPais(value)}
            showArrow={false}
          />
        </View>

        <TouchableWithoutFeedback
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}
          onPress={() => consultarClima()}>
          <Animated.View
            style={[styles.btnBuscar, estiloAnimacion]}
            useNativeDriver={false}>
            <Text style={styles.textoBuscar}>Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: 'black',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Formulario;
