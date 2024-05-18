import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostScreen = ({ route, navigation }) => {
    const { postId } = route.params;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cachedPost = await AsyncStorage.getItem(`post_${postId}`);
                if (cachedPost) {
                    setPost(JSON.parse(cachedPost));
                } else {
                    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                    const postData = await response.json();
                    setPost(postData);
                    await AsyncStorage.setItem(`post_${postId}`, JSON.stringify(postData));
                }

                const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
                const commentsData = await response.json();
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [postId]);

    if (!post) {
        return <LoadingScreen />;
    }

    const renderComment = ({ item }) => (
        <View style={styles.commentContainer}>
            <Text style={styles.commentName}>{item.name}</Text>
            <Text style={styles.commentEmail}>{item.email}</Text>
            <Text style={styles.commentBody}>{item.body}</Text>
        </View>
    );

    const renderHeader = () => (
        <View>
            <View style={styles.topPostNameContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.returnButton}>
                    <Image
                        source={require('../assets/return_button_icon.png')}
                        style={styles.returnImage}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{post.title}</Text>
                <Image
                    source={require('../assets/post_image.png')}
                    style={styles.postImage}
                />
            </View>
            <Text style={styles.aboutText}>About</Text>
            <View style={styles.aboutContainer}>
                <Text style={styles.body}>{post.body}</Text>
            </View>
            <Text style={styles.commentsText}>Comments</Text>
        </View>
    );

    return (
        <View style={styles.container}>

            <FlatList
                data={comments}
                renderItem={renderComment}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false} 
            />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
        fontFamily: 'Inter-Regular'
    },
    contentContainer: {
        paddingBottom: 100, 
    },
    topPostNameContainer: {
        padding: 20,
        width: '100%',
        height: 480,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 28,
        marginBottom: 20,
        position: 'relative',
        gap: 30
    },
    title: {
        textAlign: 'center',
        width: '90%',
        marginTop: 60,
        fontSize: 24,
        fontWeight: 'bold',
    },
    postImage: {
        width: 310,
        height: 180,
        marginTop: 20,
    },
    body: {
        fontSize: 18,
    },
    aboutText: {
        marginLeft: 23,
        fontSize: 15,
        marginBottom: 10
    },
    commentsText: {
        marginLeft: 23,
        fontSize: 15,
        marginBottom: 10
    },
    aboutContainer: {
        backgroundColor: 'white',
        marginBottom: 20,
        padding: 12,
        borderRadius: 16,
        marginHorizontal: 20,
    },
    commentContainer: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 12,
        borderRadius: 16,
        marginHorizontal: 20,
    },
    commentName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    commentEmail: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5
    },
    commentBody: {
        fontSize: 14,
    },
    returnButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    returnImage: {
        width: 24,
        height: 24,
    },
    backButton: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: '#FA8A34',
        padding: 15,
        borderRadius: 16,
        alignItems: 'center',
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PostScreen;
