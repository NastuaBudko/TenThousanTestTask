import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavComponent from '../components/NavComponent';

const PostsSearchScreen = ({ route }) => {
    const { userName } = route.params;
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('cachedPosts')
            .then((cachedPosts) => {
                if (cachedPosts) {
                    setPosts(JSON.parse(cachedPosts));
                    setFilteredPosts(JSON.parse(cachedPosts));
                }
            })
            .catch(error => console.error('Error retrieving cached posts:', error));
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = posts.filter(post =>
            post.id.toString().includes(query) || post.title.includes(query)
        );
        setFilteredPosts(filtered);
    }; 

    const renderPostItem = ({ item }) => (
        <View style={styles.postContainer}>
            <Text style={styles.postTitle}>ID: {item.id}</Text>
            <Text style={styles.postContent}>name: {item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.searchText}>Search</Text>
                        <View style={styles.searchContainer}>
                            <Image
                                source={require('../assets/search_input_icon.png')}
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search products"
                                placeholderTextColor="#606773"
                                value={searchQuery}
                                onChangeText={handleSearch}
                            />
                        </View>
            <FlatList
                data={filteredPosts}
                renderItem={renderPostItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
            <NavComponent username={userName} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
    },
    searchText: {
        color: '#06070A',
        marginTop: 70,
        marginLeft: 28,
        fontSize: 22,
        fontWeight: 600
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 25,
        marginBottom: 20,
        padding: 15,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#CED5E0',
        backgroundColor: '#F2F3F5',
        height: 56
    },
    searchInput: {
        flex: 1,
        height: '100%',
        marginLeft: 10,
    },
    searchIcon: {
        width: 24,
        height: 24,
    },
    postContainer: {
        backgroundColor: 'white',
        marginBottom: 16,
        padding: 20,
        borderRadius: 16,
        marginHorizontal: 20
    },
    
    postTitle: {
        fontSize: 15,
        fontWeight: 500,
        marginBottom: 5,
        color: '#06070A'
    },
    postContent: {
        fontSize: 13,
        fontWeight: 400,
        color: '#858C94'
    },
});

export default PostsSearchScreen;

