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
import { useEffect, useState } from "react";
import Axios from 'axios'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  Button,
  Card,
  CardHeader,
  Container,
  Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Icons = () => {
  const todayDate = new Date().toLocaleDateString('en-CA')
  const [bot, setBot] = useState([]);
  

  const initialValues = {
    GL: 0,
    GM: 0,
    GS: 0,
  };

  const validationSchema = Yup.object().shape({
    GL: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
    GM: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
    GS: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
  });

  const onSubmit = (values, { resetForm }) => {
    
    Axios.put('http://localhost:3001/add_manu', {
      GL: values.GL,
      GM: values.GM,
      GS: values.GS,
      date: todayDate,
    })
      .then(() => {
        alert('บันทึกข้อมูลสำเร็จ');
        resetForm(); // รีเซ็ตฟอร์มหลังจากส่งข้อมูลสำเร็จ
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล', error);
      });
    
  };


  const O_bot = () => {
    Axios.post('http://localhost:3001/o_bot',
      {
        date: todayDate
      })
      .then((Response) => {
        setBot(Response.data)
      })
  }
  useEffect(() => {
    O_bot()
  });

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
                <h3 className="mb-0">บันทึกการผลิต</h3>
              </CardHeader>



              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">รายการ</th>
                        <th scope="col">คำสั่ง</th>
                        <th scope="col">ผลิต</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">น้ำถัง</th>
                        {bot.map((val,key) => {return(<td>{val.OL_bot}</td>)})}
                        <td>
                          <Field type="number" name="GL" className="form-control form-control-sm"/>
                          <ErrorMessage name="GL" component="div" />
                        </td>
                        
                      </tr>
                      <tr>
                        <th scope="row">น้ำลัง</th>
                        {bot.map((val,key) => {return(<td>{val.OM_bot}</td>)})}
                        <td>
                          <Field type="number" name="GM" className="form-control form-control-sm"/>
                          <ErrorMessage name="GM" component="div" />
                        </td>
                        
                      </tr>
                      <tr>
                        <th scope="row">ขวดเพ็ท</th>
                        {bot.map((val,key) => {return(<td>{val.OS_bot}</td>)})}
                        <td>
                          <Field type="number" name="GS" className="form-control form-control-sm"/>
                          <ErrorMessage name="GS" component="div" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit"> 
                      บันทึกข้อมูล 
                    </Button>
                  </div>
                </Form>
              </Formik>

            </Card>


          </div>
        </Col>
      </Container>
    </>
  );
};

export default Icons;
