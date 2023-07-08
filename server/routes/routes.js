const express=require('express');
const router = express.Router();

const { createPost, updatePost, deletePost, getPost, getAllPosts } =require( '../controller/postController.js');
const { newComment, getComments, deleteComment}=require('../controller/commentController.js');
const { loginUser, signupUser, logoutUser }=require('../controller/userController.js');
const { authenticateToken, createNewToken }=require('../controller/jwtController.js');

//login,signup,logout
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/logout', logoutUser);
//create new token
router.post('/token', createNewToken);
//create new post,update post,delete post
router.post('/create',authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);
//get post by id,get all posts
router.get('/post/:id', authenticateToken, getPost);
router.get('/posts',  getAllPosts);

//create new comment,get comments,delete comment
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

module.exports=router;