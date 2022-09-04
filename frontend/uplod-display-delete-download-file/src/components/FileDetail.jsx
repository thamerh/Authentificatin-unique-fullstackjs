import React, { useEffect, useState } from 'react'
import {Card, Button, Container, Form, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { useHistory, useParams } from 'react-router'
import axios from 'axios'


export const FileDetail = () => {
    const [title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
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


    // handling Delete
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/files/${id}`)
        history.push('/')
    }

  

   
    return (

        <Container className="mt-10 p-4">
                <h1  className="text-center text-white FontFamily p-4">Affich Detail</h1>               
        <Row>
            <Col  className="d-flex justify-content-center " >
                <Card className='shadow-lg m-3 p-4 rounded column is-8-desktop'>
                        <Card.Img src={`http://localhost:5000/${Image}`}  fluid style={{height:'350px'}} />
                        <Card.Body>
                            <Card.Title>Title: {title}</Card.Title>
                           
                            <Card.Text>
                                Description: {Description}
                            </Card.Text>
                      
                        <br />

                    
                            <Link to={`edit/${id}`}>
                                <Button className="btn  m-2" >Edit</Button>
                            </Link>
                            
                            <Button className="btn btn-danger m-2" onClick={() => handleDelete(id)}>Delete</Button> 
                        
                    </Card.Body>        
                </Card>
            </Col>
         </Row>
    </Container>
)
}

 