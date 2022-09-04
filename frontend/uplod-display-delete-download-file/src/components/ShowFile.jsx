import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Container,Button, Row, Col} from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import { useHistory,useParams} from 'react-router-dom';
import {Card} from "react-bootstrap"
import { Link } from 'react-router-dom'
import FileDownload from 'js-file-download';

const ShowFile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [File, setFile] = useState([])
    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
      refreshToken();
  }, []);
  const refreshToken = async () => {
      try {
          const response = await axios.get('http://localhost:5000/token');
          setToken(response.data.accessToken);
      } catch (error) {
          if (error.response) {
              // history.push("/");
              window.location = "/login";
          }
      }
  }
  
  const axiosJWT = axios.create();
   
  axiosJWT.interceptors.request.use(async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
          const response = await axios.get('http://localhost:5000/token');
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setExpire(decoded.exp);
      }
      return config;
  }, (error) => {
      return Promise.reject(error);
  });
    useEffect(() => {
        const getFiles= async (token) => {
            const { data } = await axios.get('http://localhost:5000/files',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFile(data);
            
        }
    
        getFiles(token);






        
      
    },[token])
    const download = async (id) => {

        const {data} = await axios.get(`http://localhost:5000/files/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const img = data.image.slice(7);
        getDocumentDownload(img);
      };

      const getDocumentDownload=async (image)=>{

        axios({
            url:`http://localhost:5000/DownolodsFile/${(image)}`,
            method:"GET",
            responseType:"blob"
            }).then((response)=>{
                 console.log((response))
                FileDownload(response.data,'File.png')
              }); 
      }
    console.log(File)
    return (
        <div >
           <Container  className="justify-content-center p-2">

               <Row >
                    {
                        File.map(file => {
                            return <Col md={6} lg={4} sm={12} key={file.id} >
                <Card className='shadow-lg m-3 p-3 rounded' style={{ width: '25rem', height:"500px" }}>
                <Card.Img src ={` http://localhost:5000/${file.image}` } style={{ height: '18rem' }}/>
                <Card.Body>
                    <Card.Title>Title: {file.title}</Card.Title>
                    <Card.Text>
                        Description: {file.description.slice(0,10)}...
                    </Card.Text>
                 
                    <Link to={`Detail/${file.id}`}>
                        <Button variant="primary" className=' m-3 p-3 '>Detail</Button>
                    </Link>
                    <Button className=' m-3 p-3 ' variant="primary" onClick={()=>download(file.id)}>Download</Button>
                </Card.Body>
            </Card>   
                            </Col>
                        })
                    }
               </Row>


           </Container>

           
        </div>
    )
}

export default ShowFile
