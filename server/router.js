import express  from 'express';
import{
  searchNotes,
  createNote,
  deleteNote,
  getAllNotes
} from "./sequelize/nodeServer.js";
  
const router = express.Router();

router.get('/notes', async (req, res) => {
  const notes = await getAllNotes();
  res.send(JSON.stringify(notes));
});

router.post('/notes', async(req, res) => {
  try {
    const {title,content}=req.body;
    await createNote(title, content);
    res.status(200).send('笔记保存成功');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('服务器错误');
  }
});

router.get('/notes/search', async (req, res) => {
  try {
    const {q}=req.query;
    if(!q){
      return res.status(400).send('请输入搜索关键词');
    }
    const notes = await searchNotes(q);
    res.send(JSON.stringify(notes));
  } catch (error) {
    console.error(error.message);
    res.status(500).send('服务器错误');   
  }
});

router.delete('/notes/:id', async (req, res) => {
  try {
    const {id}=req.params;
    await deleteNote(id);
    res.status(200).send('笔记删除成功');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('服务器错误');
  }
});

export default router;


