
import { StyleSheet, Text, View , FlatList} from 'react-native';

//
import React, { useState, useEffect } from 'react';

export default function App() {
  //definimos un arreglo vacio con useState
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);

  //useEffect va a recibir 2 argumento el pirmero es una funcion que  va ejecutar nuestro efectos
  //el segundo argumento va a ser una arreglo el cual va a tener las dependencias de useEffect
  // cada vez que los datos del segundo argumento cambien, la funcion del primer argumento se volvera a ejecutar
// cuando el segundo argumento se deja vacio la funcion del primer argumento solo se ejecutara una vez.
  //un efecto es cualquier cosa que no sepamos que resultado va a tener
  //por ejemplo escribir en una base de datos . escribiren una api o traer los datos de un api
  //por lo tanta cada que queramos llamar a una api vamos a usar useEffect
  //useEffect(() => { funcion }, [ array])
  
  useEffect(() =>{
    //fetch nos de vuelve un objeto de tipo response(respuesta a una peticion)
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      setUsers(data);
      setLoading(false);
    })
  }, [])


  if(loading){
    return <View style={styles.center}><Text>Cargando ...</Text></View>
  }
  return (
    <View style={styles.container}>
      <FlatList 
      //definimos de donde se van a traer los datos
        data={users} 
        //definimos donde vamos mostrar estos datos y lo que nos interesa de ellos
        renderItem = {({ item }) => <Text style={styles.item}>{ item.id }....{ item.name }</Text>}
        //podemos extraer los id de la data de esta forma
        keyExtractor= {item => String(item.id)}
        />
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'stretch',
    justifyContent:'center',
    paddingTop:22,
  },
  //utilizando estas 3 propiedas podemos centar un elemente de forma vertical y horizontal
  center:{
    flex:1,
    alignItems:'stretch',
    justifyContent:'center'
  },
  item:{
    padding:10,
    fontSize:22,
    height:50,
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
  }
});
