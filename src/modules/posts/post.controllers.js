import HttpStatus from 'http-status';

import Post from './post.model';

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
