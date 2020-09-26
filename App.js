import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  });
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgcolor, setBgcolor] = useState('rgb(71,149,212)');
  const {ciudad, pais} = busqueda;

  const mostrarAlerta = () => {
    Alert.alert('Error', 'No hay resultados, intenta con otra ciudad o pais', [
      {text: 'Entendido'},
    ]);
  };

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const apiID = ' INGRESE SU API KEY ';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiID}`; //Recordar poner https:// al principio del url

        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          setResultado(resultado);
          setConsultar(false);
          //Modifica los colores de fonde de acuerdo a la temperatura

          const kelvin = 273.15;
          const {main} = resultado;
          const actual = main.temp - kelvin;

          if (actual < 10) {
            setBgcolor('rgb(105,108,149)');
          } else if (actual>= 10 && actual < 25) {
            setBgcolor('rgb(71,149,212)');
          } else {
            setBgcolor('rgb(178,28,61)');
          }
        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    consultarClima();
  }, [consultar]);

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };
  const bgcolorApp = {
    backgroundColor: bgcolor,
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app, bgcolorApp]}>
          <View style={styles.contenido}>
            <Clima resultado={resultado} />
            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
