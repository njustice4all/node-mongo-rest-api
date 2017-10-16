import Post from './post.model';

export const createPost = async (req, res) => {
  try {
    const post = await Post.createPost(req.body, req.user._id);
    return res.status(201).json(post);
  } catch (error) {
    return res.status(400).json(error);
  }
};
