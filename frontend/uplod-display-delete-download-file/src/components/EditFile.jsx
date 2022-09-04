import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Button, Container, Form} from 'react-bootstrap'
import {  useParams } from 'react-router'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import "./Form.css"
const EditFile = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [Image, setImage] = useState('')
    const [name, setName] = useState("");
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
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

        const getSingleAfficheData = async () => {
            const { data } = await axios.get(`http://localhost:5000/files/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data)
            setTitle(data.title)
            setDescription(data.description)
            setImage(data.image)

         

        }
        getSingleAfficheData()

    },[id,token])

   const updateHandler = async (e) => {

        e.preventDefault()
       
        // update by put request
        
        const data = {
            title: title,
            description: description
        }


        await axios.put(`http://localhost:5000/files/${id}`,data )

        history.push('/')

   }

    return (
         
            <Container className='mt-5 p-2 '  >
                <h1  className="text-center text-white FontFamily  p-2 ">Edit Affiche</h1>
                <Form onSubmit={updateHandler} className='w-100 p-3 col-md-6'>
         
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                          />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="discription">
                        <Form.Label>discription</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                          />
                    </Form.Group>
                    <Button  type="submit">
                        Update 
                    </Button>
                </Form>
            </Container>
    )
}

export default EditFile;
