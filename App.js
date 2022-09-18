import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Image, ActivityIndicator, ScrollView } from 'react-native';


export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  //url for the movies
  const moviesUrl = "https://api.themoviedb.org/3/discover/movie?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US&page=1&include_adult=false"

  //image base url
  const imgUrl = 'https://image.tmdb.org/t/p/w500/'

  //url for the genres
  const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US'

  //Fetching the movies 
  useEffect(() => {
    fetch(moviesUrl)
      .then((res) => res.json())
      .then(data => {
        let results = data.results
        console.log('*********************', results)
        setMovies(results)
        setLoading(false)
      }).catch((error) => console.log(error))
  }, [])


  //movies card template will refactor to another component
  const Movies = () => movies.map(movie => {
    return (
      <View style={styles.results} key={movie.id}>
        <Image
          source={{
            uri: `${imgUrl}${movie.poster_path}`
          }}
        />

        <Text style={styles.title}>{movie.title} </Text>
        <Text style={styles.rating}>Rating:{movie.vote_average}</Text>


      </View>
    )
  })


  return (
    <View style={styles.container}>
      <Text style={styles.title}>FikaSearch</Text>
      <TextInput
        style={styles.searchBox}
      />
      <ScrollView>
        {loading ? <ActivityIndicator /> : (
          <Movies />
        )}

      </ScrollView>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  title: {
    color: '#00845F',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20
  },
  rating: {
    fontSize: 12,
    color: '#00845f',
  },
  searchBox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 15,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 40
  },
  results: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 15
  },
  heading: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#fff'
  }

});
