import express from 'express';
import Post from '../schemas/post.js';

const router = express.Router();

/** 1. post등록 API **/
router.post('/', async (req,res) => {
  try {
    const { name, email, pw } = req.body;
    if ( !name || !email || !pw) {
      return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다' });
    }

    await Post.create({ name, email, pw });
    return res.status(201).json({ message: `${name}의 게시글을 생성하였습니다` });
  }
  catch (err) { console.error(err) };
});


/** 2. post전체 조회 API **/
router.get('/', async (_,res) => {
  try { 
    const posts = await Post.find().exec();
    const newPosts = posts.map((post) => { // 모든 게시글 다 조회
      return { 
        userId: post['_id'], // 고쳤으면 다르게?
        name: post['name'],
        email: post['email'],
        pw: post['pw']
      };
    });
    return res.status(200).json(newPosts)
  }
  catch (err) { console.error(err) };
});


/** 3. post상세 조회 API **/
router.get('/:userId', async (req,res) => {
  try {
    const { userId } = req.params;
    if (!userId) { return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다' }) }

    const postOne = await Post.findOne({ _id: userId }).exec(); // _id -> userId로?
    const newPost = 
      { 
        userId: postOne['userId'], 
        name: postOne['name'],
        email: postOne['email'],
        pw: postOne['pw']
      };
    

    return res.status(200).json( newPost )
  }
  catch (err) { console.error(err) };
});

export default router