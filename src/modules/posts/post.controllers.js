import HttpStatus from 'http-status';

import Post from './post.model';
import User from '../users/user.model';

export const createPost = async (req, res) => {
  try {
    const post = await Post.createPost(req.body, req.user._id);
    return res.status(HttpStatus.CREATED).json(post);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

export const getPostById = async (req, res) => {
  try {
    /**
     * populate 사용하면 유저아이디가 유저 객체로 바뀐다
     * 'user'는 post.model에 키값이 user를 뜻한다.
     */
    const post = await Post.findById(req.params.id).populate('user');
    return res.status(HttpStatus.OK).json(post);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

export const getPostLists = async (req, res) => {
  const limit = parseInt(req.query.limit, 0);
  const skip = parseInt(req.query.skip, 0);

  try {
    const posts = await Post.list({ limit, skip });
    return res.status(HttpStatus.OK).json(posts);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // 유저가 다르면
    if (!post.user.equals(req.user._id)) {
      return res.status(HttpStatus.UNAUTHORIZED);
    }

    // Object.keys(req.body) => ['title', 'text']
    Object.keys(req.body).forEach(key => {
      post[key] = req.body[key];
    });

    return res.status(HttpStatus.OK).json(await post.save());
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.user.equals(req.user._id)) {
      return res.sendStatus(HttpStatus.UNAUTHORIZED);
    }

    await post.remove();
    return res.sendStatus(HttpStatus.OK);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

export const favoritePost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    await user._favorites.posts(req.params.id);

    return res.sendStatus(HttpStatus.OK);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};
