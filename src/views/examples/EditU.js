/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import Axios from "axios"

import Chart from "chart.js";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Input
} from "reactstrap";
// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
} from "variables/charts.js";
import Header from "components/Headers/Header.js";


const EditU = (props) => {
    const todayDate = new Date().toLocaleDateString('en-CA')


    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const [Produc_list, setProduc_list] = useState([]);
    const [Sale_list, setsale_list] = useState([]);
    const [date, setDate] = useState("");
    const [user, setUser] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const User = () => {
        Axios.get("http://localhost:3001/user").then((Response) => {
            setUser(Response.data);
        })
    }

    useEffect(() => {
        User()
    });

    const Item = () => {
        Axios.post("http://localhost:3001/date", {
            date: date
        }).then((Response) => {
            setsale_list(Response.data);
        })
    }
    const deleteI = (Name) => {
        Axios.delete(`http://localhost:3001/deleteU/${Name}`).then((Response) => {
            setUser(
                user.filter((val) => {
                    return val.Name != Name;
                })
            )
        })
    }
    const positions = [
        "ผู้จัดการ",
        "พนักงานผลิต",
        "พนักงานส่งน้ำ",
        // เพิ่มตำแหน่งเพิ่มเติมตามต้องการ
      ];
      

    const validationSchema = Yup.object().shape({
        Name: Yup.string().required('กรุณากรอกชื่อ'),
        Status: Yup.string().required('กรุณากรอกตำแหน่ง'),
        ID: Yup.string().required('กรุณากรอก ID'),
        Password: Yup.string().required('กรุณากรอก Password'),
    });

    const initialValues = {
        Name: '',
        Status: '',
        ID: '',
        Password: '',
    };

    const onEdit = (values) => {
        Axios.put("http://localhost:3001/EditU", {
            Name: values.Name,
            Status: values.Status,
            ID: values.ID,
            Password: values.Password,
        })
            .then(() => {
                alert('แก้ไขข้อมูลสำเร็จ');
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล', error);
            });
    };

    const onAdd = (values) => {
        Axios.post("http://localhost:3001/regis", {
            Name: values.Name,
            Status: values.Status,
            ID: values.ID,
            Password: values.Password,
        })
            .then(() => {
                alert('เพิ่มผู้ใช้สำเร็จ');
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล', error);
            });
    };

    const onSubmit = (values, { resetForm }) => {
        if(isEditing){
            onEdit(values);
            resetForm();
        }else{
            onAdd(values);
            resetForm();
        }
    };


    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--8" fluid>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">รายชื่อผู้ใช้งานระบบ</h3>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table id="myTable" className="align-items-center table-flush" >
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">ชื่อ</th>
                                        <th scope="col">ตำแหน่ง</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Password</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        user.map((val, key) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{val.name}</th>
                                                    <td>{val.status}</td>
                                                    <td>{val.id}</td>
                                                    <td>{val.password}</td>
                                                    <td><Button color="primary" size="sm"
                                                        onClick={() => { if (window.confirm(`ต้องการลบผุ้ใช้ ${val.name} หรือไม่`)) deleteI(val.name) }}><i class="fa fa-trash" /></Button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Row className="mt-0">
                            <Card className="shadow">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">แก้ไขผู้ใช้ / เพิ่ม</h3>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <Formik initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={onSubmit}
                                        >
                                    <Form>
                                        <Table className="align-items-center table-flush" responsive>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <Field class="form-control form-control-sm" name="Name" placeholder="ชื่อ" style={{ width: '300px' }}/>
                                                        <ErrorMessage name="Name" component="div" className="text-danger" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Field as="select" name="Status" className="form-control form-control-sm">
                                                            <option value="">เลือกตำแหน่ง</option>
                                                            {positions.map((position, index) => (
                                                                <option key={index} value={position}>
                                                                    {position}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name="Status" component="div" className="text-danger" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Field class="form-control form-control-sm" type="text" name="ID" placeholder="ID" />
                                                        <ErrorMessage name="ID" component="div" className="text-danger" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Field class="form-control form-control-sm" type="text" name="Password" placeholder="Password" />
                                                        <ErrorMessage name="Password" component="div" className="text-danger" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <div className="col text-center">
                                            <Button className="my-4" color="primary" type="submit">{isEditing ? "แก้ไข" : "เพิ่ม"}</Button>
                                            <Button className="my-4" color="warning" onClick={() => setIsEditing(!isEditing)} type='button'>{isEditing ? "ยกเลิก" : "แก้ไขโหมด"}</Button>
                                        </div>
                                    </Form>
                                </Formik>
                            </Card>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default EditU;
