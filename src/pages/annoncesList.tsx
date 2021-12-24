import {useState, useEffect} from "react";
import React from 'react';
import {getAll, annonceResponse, deleteAnnonce} from "../services/annonceService";
import {Card, Button, Row} from 'react-bootstrap';


const AnnoncesList = () => {
    const [annonces, setAnnonce] = useState([]);
    const fetchAnnonce = () => {
        getAll().then(response => {
            setAnnonce(response.data)
        });
    }
    useEffect(() => {
        fetchAnnonce()
    }, [])

    return (
        <>
            <div className="header">
                <Button className="button-add">Add</Button>
            </div>
            <div>
                <div className="cards">
                    {
                    annonces.map((e : annonceResponse) => (
                        <div className="card">
                            <img src="https://www.redacteur.com/blog/wp-content/uploads/2020/06/redacteur-blog-img-une-rediger-plaquette-immobiliere-740x522.jpg"/>
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
                                    <Button className="button-update">update</Button>
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
