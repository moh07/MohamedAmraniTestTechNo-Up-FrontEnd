import {useState, useEffect} from "react";
import React from 'react';
import {getAll, annonceResponse, deleteAnnonce, getAnnonceByNameAndType} from "../services/annonceService";
import { Image, Form, Input, Col, Row, Button} from "antd";
import { useHistory } from "react-router-dom";

const AnnoncesList = () => {
    const [form] = Form.useForm()
    const history = useHistory()
    const [annonces, setAnnonce] = useState([]);
    const fetchAnnonce = () => {
        getAll().then(response => {
            setAnnonce(response.data)
        });
    }
    useEffect(() => {
        fetchAnnonce()
    }, [])
    const onFinish = (values : any) => {
        
            getAnnonceByNameAndType(values.name?values.name:"",values.type?values.type:"").then(response => {
                setAnnonce(response.data)
            });
        
    };
    return (
        <>
            <div className="header">
            <Form layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    autoComplete="true">
                    <Row gutter={8}>
                        <Col xs={7}
                            sm={7}
                            lg={7}>
                            <Form.Item label="Name" name="name">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={7}
                            sm={7}
                            lg={7}>
                            <Form.Item label="Type" name="type">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={10}
                            sm={10}
                            lg={10}>
                        <Button className="button-add" htmlType="submit">search</Button>
                        <Button className="button-add" onClick={()=>history.push(`/createOrUpdate/create`)}>Add</Button>

                        </Col>
                    </Row>
                    </Form>
            </div>
            <div>
                <div className="cards">
                    {
                    annonces.map((e : annonceResponse) => (
                        <div className="card">
                            <img src={`http://localhost:8080/downloadFile/${e.image}`} className="imgcss"/>
                            <div className="card-body">
                                <h2>{
                                    e.name
                                }</h2>
                                <p>{
                                    e.description
                                }</p>
                                <h5>{
                                    e.type
                                }</h5>
                                <div>
                                    <Button className="button-delete"
                                        onClick={
                                            () => {
                                                deleteAnnonce(e.id).then(() => fetchAnnonce())
                                            }
                                    }>delete</Button>
                                    <Button className="button-update" onClick={()=>history.push(`/createOrUpdate/${e.id}`)}>update</Button>
                                </div>
                            </div>
                        </div>
                    ))
                } </div>
            </div>
        </>
    );
};

export default AnnoncesList;
