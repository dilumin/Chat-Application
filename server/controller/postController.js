
const DB = require('../model/social');
const {myFriends} = require('../model/friends');

const PostingPost = (req, res) => {
    const email = req.body.email;
    if (!email) {
        res.status(400).json({ message: 'Didnt provide email' });
        return;
    }
    const post = req.body?.post;
    if (!post) {
        res.status(400).json({ message: 'Didnt provide post' });
        return;
    }
    DB.createPosts(email , post , post?.image).then((post) => {
        res.status(201).json({ message: 'Post added', post: post });
    }
    ).catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
    
}

const getPostsofFriends = async (req, res) => {
    const email = req.query.email;
    console.log("--------------", email);

    if (!email) {
        res.status(400).json({ message: 'Didnt provide email' });
        return;
    }
    let friends = [];
    try {
    console.log(await myFriends(email));
    friends = await myFriends(email);
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

    
    let posts = [];
    friends.forEach((friend) => {
        console.log( "THE FRIEND IS ", friend);
        DB.getPosts(friend).then((res1) => {
            console.log("THE POSTS ARE OF TIS FRINDS ", res1);
            posts = [...posts, ...res1[0].map(post => ({ ...post, "email": friend }))];
            // posts = [...posts, ...res1[0]]; 
            return res1[0];
        }).catch((error) => {
            console.log(error);
            return [];
        });
        // posts.push(friendPosts);
    });

    DB.getPosts(email).then((res1) => {
        if (res1) {
            posts = [...posts, ...res1[0].map(post => ({ ...post, "email": email }))];
            posts.sort((a, b) => {
        return b.created_at - a.created_at;
    });
    res.status(200).json({ message: 'Posts found', posts: posts });


        } else {
            res.status(404).json({ message: 'Posts not found' });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
    console.log("MY POSTS", posts);
    
}

    


const getPostss = (req, res) => {
    const email = req.query.email;

    if (!email) {
        res.status(400).json({ message: 'Didnt provide email' });
        return;
    }
    DB.getPosts(email).then((res1) => {
        if (res1) {
            res.status(200).json({ message: 'Posts found', posts: res1[0] });
        } else {
            res.status(404).json({ message: 'Posts not found' });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    });

}


module.exports = { PostingPost , getPostss , getPostsofFriends };