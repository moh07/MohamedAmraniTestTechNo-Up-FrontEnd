import {useState, useEffect} from "react";
import React from 'react';
import {
    getAll,
    annonceResponse,
    deleteAnnonce,
    onFileUpload,
    createAnnonce,
    getAnnonceById,
    updateAnnonce
} from "../services/annonceService";
import {
    Form,
    message,
    Row,
    Input,
    Button,
    Col,
    Modal
} from "antd";

import {useForm} from "antd/lib/form/Form";
import FormItemInput from "antd/lib/form/FormItemInput";
import Checkbox from "antd/lib/checkbox/Checkbox";
import PriceInput from "../component/priceComponent";
import {Rule} from "antd/lib/form";
import PicturesWall from "../component/pictureTakeComponent";
import {useParams} from "react-router-dom";
const {TextArea} = Input

const AnnonceDetails = () => {

    const {idOrCreate} = useParams < {
        idOrCreate: any;
    } > ()
    const [isCreate, setIsCreacte] = useState(idOrCreate === "create")
    const checkPrice = () => {
        console.log(form.getFieldValue("price"))
        if (Number(form.getFieldValue("price")) > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Price must be greater than zero!'));
    };
    const [form] = Form.useForm()

    const onFinish = (values : any) => {
        console.log('Success:', values);
        if (isCreate) {
            let file = form.getFieldValue("image")
            let val = {
                ...values,
                image: values.image.name
            }
            createAnnonce(val).then(response => {
                onFileUpload(file)
                Modal.success({
                    content: 'Annonce created with success',
                  });
            });
        } else {
            let file = form.getFieldValue("image")
            if (file instanceof File) {
                let val = {
                    ...values,
                    image: values.image.name,
                    id:idOrCreate
                }
                updateAnnonce(val).then(response => {
                    onFileUpload(file)
                    Modal.success({
                        content: 'Annonce updated with success',
                      });
                });
            } else 
            {
                let val = {
                    ...values,
                    id:idOrCreate
                }
                updateAnnonce(val).then(response => {
                    Modal.success({
                        content: 'Annonce updated with success',
                      });
                });}
            

        }
    };
    const onFinishFailed = (errorInfo : any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (!isCreate && idOrCreate) {
            console.log(idOrCreate)
            getAnnonceById(Number(idOrCreate)).then(response => {
                form.setFieldsValue(response.data)
            });
        }
    }, [form])

    return(
        isCreate ? (
        <div className="cards">
            <div className="card-body">
                <Form layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="true">
                    <Row gutter={8}>
                        <Col xs={12}
                            sm={12}
                            lg={12}>
                            <Form.Item label="Name" name="name"
                                rules={
                                    [{
                                            required: true,
                                            message: 'Please input announce name!'
                                        },]
                            }>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12}
                            sm={12}
                            lg={12}>
                            <Form.Item label="Type" name="type"
                                rules={
                                    [{
                                            required: true,
                                            message: 'Please input announce type!'
                                        },]
                            }>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col xs={12}
                            sm={12}
                            lg={12}>
                            <Form.Item label="Price" name="price"
                                rules={
                                    [{
                                            validator: checkPrice
                                        },]
                            }>
                                <PriceInput/>
                            </Form.Item>
                        </Col>
                        <Col xs={12}
                            sm={12}
                            lg={12}>
                            <Form.Item label="Image" name="image"
                                rules={
                                    [{
                                            required: true,
                                            message: 'Please input announce image!'

                                        },]
                            }>
                                <PicturesWall setUrl={
                                    (e) => {
                                        console.log("img", e)
                                        form.setFieldsValue({"image": e})
                                    }
                                }/>
                            </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Description" name="description"
                    rules={
                        [{
                                required: true,
                                message: 'Please input announce Description!'
                            },]
                }>
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item noStyle>
                    <Button type="primary" htmlType="submit"
                        className={"button-add"}>
                        save
                    </Button>

                </Form.Item>
            </Form>
        </div>
    </div>
    ) : (

        <div className="cards">
            <div className="card-body">
                <Form layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="true">
                    <Row gutter={8}>
                        <Col xs={12}
                            sm={12}
                            lg={12}>
                            <Form.Item label="Name" name="name"
                                rules={
                                    [{
                                            required: true,
                                            message: 'Please input announce name!'
                                        },]
                            }>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12}
                            sm={12}
                            lg={12}>
                            <Form.Item label="Type" name="type"
                                rules={
                                    [{
                                            required: true,
                                            message: 'Please input announce type!'
                                        },]
                            }>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col xs={12}
                            sm={12}
                            lg={12}>
                            <Form.Item label="Price" name="price"
                                rules={
                                    [{
                                            validator: checkPrice
                                        },]
                            }>
                                <PriceInput/>
                            </Form.Item>
                        </Col>
                        <Col xs={12}
                            sm={12}
                            lg={12}>
                            <Form.Item label="Image" name="image"
                                rules={
                                    [{
                                            required: true,
                                            message: 'Please input announce image!'

                                        },]
                            }>
                                <PicturesWall setUrl={
                                    (e) => {
                                        console.log("img", e)
                                        form.setFieldsValue({"image": e})
                                    }
                                }/>
                            </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Description" name="description"
                    rules={
                        [{
                                required: true,
                                message: 'Please input announce Description!'
                            },]
                }>
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item noStyle>
                    <Button type="primary" htmlType="submit"
                        className={"button-add"}>
                        save
                    </Button>

                </Form.Item>
            </Form>
        </div>
    </div>
    ));
};

export default AnnonceDetails;
