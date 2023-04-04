// import React, { Component } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faPlusCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';


import React, { useState, useEffect } from "react";

function CheckoutMethod() {
    let back = 0
    const [enrollment, setEnrollment] = useState([]);
    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = sessionStorage.getItem("data");
                data = JSON.parse(data);
                const res = await axios.post('http://127.0.0.1:8000/camps/checkout/', data)
                const enrolldata = await res.data;
                setEnrollment(enrolldata);
                back = enrolldata

                setContent(
                    <section style={{ backgroundColor: '#eee' }}>
                        <div className="container py-5">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row d-flex justify-content-center pb-1" style={{ width: "100%" }}>
                                        {/* Info */}
                                        <div className="col-md-7 col-xl-3 mb-4 mb-md-0">
                                            <div className="py-4 d-flex flex-row">
                                                <h5>
                                                    <FontAwesomeIcon icon={faCheckSquare} style={{ color: 'green' }} className="pe-2" />
                                                    <b>Sucssesufull</b> |
                                                </h5>
                                                <span className="ps-2">Pay</span>
                                            </div>
                                            <h4 className="text-success">{enrolldata.enrolment.total_price} $</h4>
                                            <h4>For {enrolldata.enrolment.max_attendees} child</h4>
                                        </div>
                                        {/* image */}

                                        <div className="col-md-5 col-xl-4 offset-xl-1">
                                            <div className="py-4 d-flex justify-content-end">
                                                <h6>
                                                    <a href="/">home</a>
                                                </h6>
                                            </div>
                                            <div className="rounded d-flex flex-column p-2" style={{ backgroundColor: '#f8f9fa' }}>
                                                city : {enrolldata.enrolment.city}
                                            </div>
                                        </div>
                                        {/* Image */}
                                        <div className="col-md-7 col-xl-5 mb-4 mb-md-0">
                                            {enrolldata.image && (
                                                <img className="postImg" src={`http://127.0.0.1:8000${enrolldata.image}`} alt="img" />
                                            )}
                                            <p>this QRCode is <span style={{ color: 'red' }}>required</span> with the attendees </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    )
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    console.log("hiddddddddddddi2");
    console.log(enrollment.image);
    console.log(enrollment);
    console.log(back);

    return (content);
}

export default CheckoutMethod;
