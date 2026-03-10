import { useState, useEffect} from "react";
import toast, {Toaster} from "react-hot-toast";
import { FaSearch } from 'react-icons/fa';
import { Button,FloatButton } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

export default function Note(){
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [note, setNote] = useState<{id: number; title: string; content: string ; createdAt:string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllNotes=async ()=>{
    try {
      const response = await fetch('http://localhost:3001/api/notes');
      if (!response.ok) {
        throw new Error('获取笔记失败');
      }
      const data = await response.json();
      setNote(data);
    } catch (error) {
      console.error('无法加载笔记:', error);
    }finally{
      setIsLoading(false);
    }
  }
  
  const searchNotes = async () => {
    if (!searchTerm) {
      fetchAllNotes();
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3001/api/notes/search?q=${searchTerm}`);
      if(!response.ok){
        throw new Error('获取笔记失败')
    }
      const data = await response.json();
      setNote(data);
    } catch (error) {
      console.error('无法加载笔记');
    }
    finally{
      setIsLoading(false);
    }
  };
  
  const saveNote=async ()=>{
    if(!title || !content){
      toast.error('标题和内容都不能为空');
      return;
    }
    try{
      const response=await fetch('http://localhost:3001/api/notes',{
      method:'POST',
      body:JSON.stringify({title,content}),
      headers:{
        'Content-Type': 'application/json'
      }
    });

    if(!response.ok){
      throw new Error('保存笔记失败');
    }
    setTitle('');
    setContent('');
    await fetchAllNotes();
    toast.success('笔记保存成功');
  }catch(error){
    console.error(error);
    toast.error('保存笔记失败');
  }
}

   const deleteNote = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/notes/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('删除笔记失败');
      }
      setNote(note.filter(n => n.id !== id));
      await fetchAllNotes();
      toast.success('笔记删除成功');
    } catch (error) {
      console.error(error);
      toast.error('删除笔记失败');
    }
  };
  
  useEffect(()=>{
    fetchAllNotes();
  }, []);

return(
  <div>
    <Toaster position="top-center" reverseOrder={false}/>
    <h1>笔记记录器</h1>
    <div className="search-container">
      <input className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  placeholder="搜索笔记" />
      <button className='search-button' onClick={searchNotes}><FaSearch /></button>
    </div>
    <div className="group">
      <div className="form-group">
        <label>标题：</label><br />
        <input className="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="标题" />
      </div>
      <div className="form-group">
        <label>内容：</label><br />
        <textarea  className="content" value={content} onChange={(e)=>setContent(e.target.value)} placeholder="内容" />
      </div>
      <Button type="primary" onClick={saveNote}>保存笔记</Button>
    </div>
    <hr />
      <h2>笔记列表</h2>
    {isLoading ? <p>正在加载中...</p> : (
      note.map((noteItem) => (
        <div className="note-item" key={noteItem.id}>
          <h3>标题：{noteItem.title}</h3>
          <p>内容：{noteItem.content}</p>
          <div className="created-at">
            <small>创建时间：{new Date(noteItem.createdAt).toLocaleDateString('zh-CN')}</small>
          </div>
          <Button type="primary" color="danger" variant="solid" onClick={() => deleteNote(noteItem.id)}>删除</Button>
        </div>
      ))
    )}
    <FloatButton.BackTop 
      visibilityHeight={100} icon={<ArrowUpOutlined />} type="primary" tooltip="返回顶部" />
  </div>
)
}

