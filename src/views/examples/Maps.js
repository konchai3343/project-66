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
import { useState } from "react";
import Axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  UncontrolledTooltip,
  Alert,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Icons = () => {
  const todayDate = new Date().toLocaleDateString('en-CA')
  const [Name, setName] = useState("");
  const [Number, setNumber] = useState('');
  const [Tank, setTank] = useState(0);
  const [Bottle, setBottle] = useState(0);
  const [Pet, setPet] = useState(0);
  const [date, setDate] = useState('');

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required('กรุณากรอกผู้ซื้อ'),
    Number: Yup.number().required('กรุณากรอกเลขใบเสร็จ'),
    Tank: Yup.number().required('กรุณากรอกน้ำถัง'),
    Bottle: Yup.number().required('กรุณากรอกน้ำลัง'),
    Pet: Yup.number().required('กรุณากรอกขวดเพ็ท'),
  });

  const [submitError, setSubmitError] = useState(null);

  const add_sale = (values) => {
    Axios.post('http://localhost:3001/add_sale', {
      Name: values.Name,
      Number: values.Number,
      Tank: values.Tank,
      Bottle: values.Bottle,
      Pet: values.Pet,
      date: todayDate
    }).then(() => {
      alert('บันทึกสำเร็จ');
      
    }).catch((error) => {
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล', error);
    });
  };


  const initialValues = {
    Name: "",
    Number: "",
    Tank: 0,
    Bottle: 0,
    Pet: 0,
  };
  
  const onSubmit = (values, { resetForm }) => {
    Axios.post('http://localhost:3001/CheckNumber', {
      Number: values.Number,
      date: todayDate
    }).then((Response) => {
      if (Response.data.length === 0) {
        add_sale(values);
        resetForm();
      } else {
        setSubmitError('ใบเสร็จนี้ถูกบันทึกไปแล้ว');
      }
    });
  };

  const check_sale = () => {
    Axios.post('http://localhost:3001/CheckNumber', {
      Number: Number,
      date: todayDate
    }).then((Response) => {
      if (Response.data.length == 0) {
        add_sale()
        alert('บันทึกสำเร็จ');
      } else {
        alert('ใบเสร็จนี้ถูกบันทึกไปแล้ว');
      }
    });
  }


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Col className="center" xl="6">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">บันทึกรายการขาย</h3>
              </CardHeader>


              <CardBody className="px-lg-5 py-lg-5">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div>
                      <label htmlFor="Name">ผู้ซื้อ</label>
                      <Field type="text" id="Name" name="Name" className="form-control form-control-sm"/>
                      <ErrorMessage name="Name" component="div" className="text-danger" />
                    </div>
                    <div>
                      <label htmlFor="Number">เลขใบเสร็จ</label>
                      <Field type="number"id="Number"name="Number"className="form-control form-control-sm"/>
                      <ErrorMessage name="Number" component="div" className="text-danger" />
                    </div>
                    <div>
                      <label htmlFor="Tank">น้ำถัง</label>
                      <Field type="number"id="Tank"name="Tank"className="form-control form-control-sm" />
                      <ErrorMessage name="Tank" component="div" className="text-danger" />
                    </div>
                    <div>
                      <label htmlFor="Bottle">น้ำลัง</label>
                      <Field type="number" id="Bottle"name="Bottle"className="form-control form-control-sm"/>
                      <ErrorMessage name="Bottle" component="div" className="text-danger" />
                    </div>
                    <div>
                      <label htmlFor="Pet">ขวดเพ็ท</label>
                      <Field type="number" id="Pet" name="Pet" className="form-control form-control-sm"/>
                      <ErrorMessage name="Pet" component="div" className="text-danger" />
                    </div>
                    {submitError && (
                      <div className="text-danger">{submitError}</div>
                    )}
                    <div className="text-center">
                      <Button className="my-4" color="primary" type="submit">
                        บันทึกข้อมูล
                      </Button>
                    </div>
                  </Form>
                </Formik>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Container>
    </>
  );
};

export default Icons;
