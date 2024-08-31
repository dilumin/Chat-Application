const DB = require("../model/social");
const { myFriends } = require("../model/friends");
const crypto = require("crypto");

const { createPosts } = require("../model/social");

const S3Client = require("@aws-sdk/client-s3").S3Client;
const PutObjectCommand = require("@aws-sdk/client-s3").PutObjectCommand;

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_BUCKET_REGION,
});

const PostingPost = (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(400).json({ message: "Didnt provide email" });
    return;
  }
  const post = req.body?.post;
  if (!post) {
    res.status(400).json({ message: "Didnt provide post" });
    return;
  }
  DB.createPosts(email, post, post?.image)
    .then((post) => {
      res.status(201).json({ message: "Post added", post: post });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const func = async (command) => {
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};

const getPostsofFriends = async (req, res) => {
  const email = req.query.email;

  if (!email) {
    res.status(400).json({ message: "Didnt provide email" });
    return;
  }

  try {
    let friends = await myFriends(email);
    let posts = [];

    // Fetch posts \\\\]\]\for all friends
    const friendPostsPromises = friends.map((friend) =>
      DB.getPosts(friend).then((res1) =>
        res1[0].map((post) => ({ ...post, email: friend }))
      )
    );

    // Fetch the posts for the user
    const userPosts = await DB.getPosts(email);
    if (userPosts) {
      posts = [...userPosts[0].map((post) => ({ ...post, email: email }))];
    }

    // Await all the promises and merge them into the posts array
    const friendsPosts = await Promise.all(friendPostsPromises);
    posts = [...posts, ...friendsPosts.flat()];

    // Sort posts by creation date
    posts.sort((a, b) => b.created_at - a.created_at);

    // Resolve image URLs
    const imageUrlPromises = posts.map(async (post) => {
      if (post.img_url) {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: post.img_url,
        };
        const command = new GetObjectCommand(params);
        post.image = await func(command);
      }
    });

    // Wait for all image URLs to be resolved
    await Promise.all(imageUrlPromises);
    res.status(200).json({ message: "Posts found", posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPostss = (req, res) => {
  const email = req.query.email;

  if (!email) {
    res.status(400).json({ message: "Didnt provide email" });
    return;
  }

  DB.getPosts(email)
    .then((res1) => {
      if (res1) {
        res.status(200).json({ message: "Posts found", posts: res1[0] });
      } else {
        res.status(404).json({ message: "Posts not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const RandomImageName = (bytes = 32) => {
  return crypto.randomBytes(20).toString("hex");
};

const photoHandle = (req, res) => {
  const ImageName = RandomImageName();
  const email = req.body.email;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: ImageName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
    ACL: "",
  };
  const command = new PutObjectCommand(params);

  s3.send(command)
    .then((data) => {
      try {
        createPosts(email, req.body.content, ImageName);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }

      res.status(201).json({ message: "Photo Uploaded" });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { PostingPost, getPostss, getPostsofFriends, photoHandle };
