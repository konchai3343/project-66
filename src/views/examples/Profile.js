
import React from "react";
import Axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components


const Profile = () => {

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required('กรุณากรอกชื่อ'),
    Tell: Yup.string().required('กรุณากรอกเบอร์โทร'),
    Address: Yup.string().required('กรุณากรอกที่อยู่'),
    Subdistrict: Yup.string().required('กรุณากรอกตำบล'),
    Country: Yup.string().required('กรุณากรอกอำเภอ'),
    Tank: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
    Bottle: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
    Pet: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
  });
  const initialValues = {
    Name: "",
    Tell: "",
    Address: "",
    Subdistrict: "",
    Country: "",
    Tank: 0,
    Bottle: 0,
    Pet: 0,
  };
  const onSubmit = (values, { resetForm }) => {
    Axios.post('http://localhost:3001/porder', {
      Name: values.Name,
      Tell: values.Tell,
      Address: values.Address,
      TB: values.Subdistrict,
      Country: values.Country,
      Tank: values.Tank,
      Bottle: values.Bottle,
      Pet: values.Pet,
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

      {/* Page content */}
      <Container className="mt--5" fluid>
        <Row>
          <Col className="center" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">กรอกคำสั่งซื้อ</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <label className="form-control-label">
                            ชื่อ
                          </label>
                          <Field type="text" name="Name" className="form-control form-control-sm" />
                          <ErrorMessage name="Name" component="div" className="text-danger"/>
                        </Col>
                        <Col lg="6">
                          <label className="form-control-label">
                            เบอร์โทร
                          </label>
                          <Field type="text" name="Tell" className="form-control form-control-sm" />
                          <ErrorMessage name="Tell" component="div" className="text-danger"/>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <label className="form-control-label">ที่อยู่</label>
                          <Field type="text" name="Address" className="form-control form-control-sm" />
                          <ErrorMessage name="Address" component="div" className="text-danger"/>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <label className="form-control-label">ตำบล</label>
                          <Field type="text" name="Subdistrict" className="form-control form-control-sm" />
                          <ErrorMessage name="Subdistrict" component="div" className="text-danger"/>
                        </Col>
                        <Col lg="6">
                          <label className="form-control-label">อำเภอ</label>
                          <Field type="text" name="Country" className="form-control form-control-sm" />
                          <ErrorMessage name="Country" component="div" className="text-danger"/>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4"><label className="form-control-label">รายการสินค้า</label></h6>
                    <div className="pl-lg-4">
                      <Row className="my-4">
                        <Col lg="4">
                          <label className="form-control-label">น้ำถัง 20 ลิตร</label>
                        </Col>
                        <Col>
                          <Field type="number" name="Tank" className="form-control form-control-sm" />
                          <ErrorMessage name="Tank" component="div" className="text-danger"/>
                        </Col>
                      </Row >
                      <Row className="my-4">
                        <Col lg="4">
                          <label className="form-control-label">น้ำลัง 20 ขวด</label>
                        </Col>
                        <Col >
                          <Field type="number" name="Bottle" className="form-control form-control-sm" />
                          <ErrorMessage name="Bottle" component="div" className="text-danger"/>
                        </Col>
                      </Row>
                      <Row className="my-4">
                        <Col lg="4">
                          <label className="form-control-label">ขวดเพ็ท 1 แพ็ค</label>
                        </Col>
                        <Col>
                          <Field type="number" name="Pet" className="form-control form-control-sm" />
                          <ErrorMessage name="Pet" component="div" className="text-danger"/>
                        </Col>
                      </Row>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button className="my-4" color="red" type="reset" >
                          ล้างฟอร์ม
                        </Button>
                        <Button className="my-4" color="primary" type="submit" >
                          สั่งสินค้า
                        </Button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
