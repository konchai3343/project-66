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
import Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Card,
  CardHeader,
  Container,
  Col,
} from "reactstrap";
import Header from "components/Headers/Header.js";

const M_Stock = () => {
  const todayDate = new Date().toLocaleDateString('en-CA')
  const [FS, setFS] = useState(0);    const [DFS, setDFS] = useState(0);  
  const [FL, setFL] = useState(0);   const [DFL, setDFL] = useState(0);  
  const [FM, setFM] = useState(0);   const [DFM, setDFM] = useState(0);

  const validationSchema = Yup.object().shape({
    FS: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
    DFS: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
    FM: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
    DFM: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
    FL: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
    DFL: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
  });

  const initialValues = {
    FS: 0, 
    DFS: 0,
    FM: 0, 
    DFM: 0,
    FL: 0, 
    DFL: 0,
  };
const onSubmit = (values, { resetForm }) => {
  Axios.put("http://localhost:3001/Mupdate", {
    FS: FS, 
    DFS: DFS,
    FM: FM, 
    DFM: DFM,
    FL: FL, 
    DFL: DFL,
    date: todayDate
  })
      .then(() => {
        alert('บันทึกข้อมูลสำเร็จ');
        resetForm(); // รีเซ็ตฟอร์มหลังจากส่งข้อมูลสำเร็จ
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล', error);
      });
  };
 

    
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
                <h3 className="mb-0">บันทึกสต็อก</h3>
              </CardHeader>
              
          
              <Formik initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}>
              <Form>
                <table class="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">รายการ</th>
                    <th scope="col">จำนวน</th>
                    <th scope="col">ชำรุด</th>
                  </tr>
                </thead>
                    <tbody>
                        <tr>
                            <th scope="row">น้ำถัง</th>
                            <td><Field type="number" name="FL" className="form-control form-control-sm" />
                                <ErrorMessage name="FL" component="div" className="text-danger"/></td>
                            <td><Field type="number" name="DFL" className="form-control form-control-sm" />
                                <ErrorMessage name="DFL" component="div" className="text-danger"/></td>
                        </tr>
                        <tr>
                            <th scope="row">น้ำลัง</th>
                            <td><Field type="number" name="FM" className="form-control form-control-sm" />
                                <ErrorMessage name="FM" component="div" className="text-danger"/></td>
                            <td><Field type="number" name="DFM" className="form-control form-control-sm" />
                                <ErrorMessage name="DFM" component="div" className="text-danger"/></td>
                        </tr>
                        <tr>
                            <th scope="row">ขวดเพ็ท</th>
                            <td><Field type="number" name="FS" className="form-control form-control-sm" />
                                <ErrorMessage name="FS" component="div" className="text-danger"/></td>
                            <td><Field type="number" name="DFS" className="form-control form-control-sm" />
                                <ErrorMessage name="DFS" component="div" className="text-danger"/></td>
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

export default M_Stock;
