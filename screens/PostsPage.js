import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Импорт AsyncStorage
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import NavComponent from '../components/NavComponent';
import PostsSearchScreen from './PostsSearchScreen';

const PostsPage = ({ route }) => {
  const { userName } = route.params;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('cachedPosts')
      .then((cachedPosts) => {
        if (cachedPosts) {
          setPosts(JSON.parse(cachedPosts));
        } else {
          fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
              AsyncStorage.setItem('cachedPosts', JSON.stringify(data));
              setPosts(data);
            })
            .catch(error => console.error('Error fetching posts:', error));
        }
      })
      .catch(error => console.error('Error retrieving cached posts:', error));
  }, []);

  const navigation = useNavigation();

  const handlePostPress = (item) => {
    navigation.navigate('PostScreen', { postId: item.id });
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePostPress(item)}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.postsList}>
            <View style={styles.topNameContainer}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 0.3)']}
                style={styles.gradient}
              >
                <Text style={styles.yourNameText}>Your name:</Text>
                <Text style={styles.usernameText}>{userName}</Text>
              </LinearGradient>
            </View>
            <View style={styles.goToCallBlockContainer}>
              <View style={styles.goToCallBlockText}>
                <Text style={styles.containerNameText}>Test task</Text>
                <Text style={styles.containerDescription}>Lorem ipsum</Text>
                <Text style={styles.goToCallText}>Go to call     &gt;</Text>
              </View>
              <Image
                source={require('../assets/go_to_call_block_image.png')}
                style={styles.blockImage}
              />
            </View>
            <Text style={styles.postsText}>Before you start</Text>
            <ScrollView horizontal style={styles.scrollView}>
              <View style={styles.carousel}>
                <View style={styles.carouselItemFirst}>
                  <View style={styles.firstSlideInfoContainer}>
                    <Image
                      source={require('../assets/carousel_icon_first.png')}
                      style={styles.carouselImage}
                    />
                    <Text style={styles.carouselFirstItemText}>Link your bank account</Text>
                  </View>
                  <Text style={styles.carouselFirstItemBottomText}>2 steps</Text>
                  <Image
                    source={require('../assets/ArrowLeft.png')}
                    style={styles.carouselArrowImage}
                  />
                </View>
                <View style={styles.carouselItemSecond}>
                  <View style={styles.firstSlideInfoContainer}>
                    <Image
                      source={require('../assets/carousel_icon_second.png')}
                      style={styles.carouselImage}
                    />
                    <Text style={styles.carouselSecondItemText}>Add funds to your wallet</Text>
                  </View>
                  <Text style={styles.carouselSecondItemBottomText}>3 steps</Text>
                  <Image
                    source={require('../assets/ArrowLeft.png')}
                    style={styles.carouselArrowImage}
                  />
                </View>
              </View>
            </ScrollView>
            <Text style={styles.postsText}>Posts</Text>
          </View>
        )}
      />
      <PostsSearchScreen posts={posts} route={route} onSelectPost={handlePostPress} username={userName} />
      <NavComponent username={userName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    fontFamily: 'Inter-Regular'
  },
  topNameContainer: {
    width: '100%',
    height: 296,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FA8A34',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#fbab6d',
    borderStyle: 'solid',
  },

  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },

  usernameText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 700,
    fontFamily: 'Inter-Bold',
    marginTop: 10
  },

  yourNameText: {
    color: 'white',
    fontSize: 16
  },

  scrollView: {
    width: '100%',
    height: 200,
  },

  goToCallBlockContainer: {
    height: 144,
    width: '90%',
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
    marginVertical: 35
  },

  goToCallBlockText: {
    display: 'flex',
  },

  goToCallText: {
    color: '#009E81',
    fontWeight: 500,
    fontSize: 18,
    marginTop: 20
  },

  containerNameText: {
    color: '#06070A',
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 5
  },

  containerDescription: {
    color: '#858C94',
    fontSize: 13
  },

  blockImage: {
    height: 127,
    width: 128,
  },

  postsText: {
    marginLeft: 23,
    fontSize: 15,
    marginBottom: 10,
    color: '#606773'
  },
  postContainer: {
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 20
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#171718'
  },
  postContent: {
    fontSize: 16,
    color: '#414141'
  },

  carousel: {
    width: 400,
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 20
  },
  carouselItemFirst: {
    width: '70%',
    padding: 10,
    backgroundColor: '#636363',
    borderRadius: 16,
    height: 152,
    padding: 20
  },

  carouselFirstItemText: {
    color: 'white',
    width: 133
  },

  carouselItemSecond: {
    width: '70%',
    padding: 10,
    backgroundColor: '#EE6363',
    borderRadius: 16,
    height: 152,
    padding: 20
  },

  carouselImage: {
    width: 48,
    height: 48
  },
  firstSlideInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    position: 'relative'
  },
  firstlSlideBottonInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 5,
    marginTop: 35,
    gap: 40
  },
  carouselArrowImage: {
    width: 24,
    height: 24,
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  carouselSecondItemText: {
    width: 133
  },
  carouselSecondItemBottomText: {
    color: '#636363',
    position: 'absolute',
    left: 25,
    bottom: 20,
  },
  carouselFirstItemBottomText: {
    position: 'absolute',
    left: 25,
    bottom: 20,
    color: 'white',
  },

  firstSlideBottonInfo: {
    display: 'flex',
    flexDirection: 'row',
  }

});

export default PostsPage;
