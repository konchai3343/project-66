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
import { useState } from "react";
import Axios from "axios"

import Chart from "chart.js";
import { jsPDF } from "jspdf";
import "jspdf/dist/polyfills.es.js";
import "jspdf-autotable";
import './THSarabun-normal';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";
import Header from "components/Headers/Header.js";


const Index = (props) => {
  const todayDate = new Date().toLocaleDateString('en-CA')

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const [Sale_list, setsale_list] = useState([]);
  const [date, setDate] = useState("");
  const Item = () => {
    Axios.post("http://localhost:3001/date", {
      date: date
    }).then((Response) => {
      setsale_list(Response.data);
    })
  }
  const deleteI = (number) => {
    Axios.delete(`http://localhost:3001/delete/${number}`).then((Response) => {
      setsale_list(
        Sale_list.filter((val) => {
          return val.number !== number;
        })
      )
    })
  }
  
  const validationSchema = Yup.object().shape({
    Number: Yup.string().required('กรุณากรอกเลขบิล'),
    Tank: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
    Bottle: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
    Pet: Yup.number().min(0, 'จำนวนต้องไม่น้อยกว่า 0').required('กรุณากรอกจำนวน'),
  });

  const initialValues = {
    Number: '',
    Tank: '',
    Bottle: '',
    Pet: '',
  };
  const onSubmit = (values, { resetForm }) => {
      Axios.put("http://localhost:3001/EditSale", {
        Name: values.Name,
        Number: values.Number,
        Tank: values.Tank,
        Bottle: values.Bottle,
        Pet: values.Pet,
        date: todayDate
      })
        .then(() => {
          alert('แก้ไขข้อมูลสำเร็จ');
          resetForm(); // รีเซ็ตฟอร์มหลังจากส่งข้อมูลสำเร็จ
          Item()
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล', error);
        });
    
  };



  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    const title = `Sale Report                                                                                                                วันที่ : ${date}`;
    const headers = [["ชื่อร้าน", "เลขใบเสร็จ", "น้ำถัง", "น้ำลัง", "ขวดเพ็ท"]];

    const data = Sale_list.map(elt => [elt.name, elt.number, elt.tank, elt.bottle, elt.pet]);
    const content = {
      startY: 60,
      head: headers,
      headStyles: { font: "THSarabun", fontStyle: 'normal', halign: "left", fontSize: 15 },
      body: data,
      bodyStyles: { font: "THSarabun", fontStyle: 'normal', halign: "left", fontSize: 15 },
    };
    doc.addFont("THSarabun.ttf", "THSarabun", "normal");
    doc.setFont("THSarabun");
    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  }



  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--8" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="9">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Sale Report</h3>
                  </div>
                  <form>
                    <input type="date" onChange={(event) => { setDate(event.target.value) }} />
                  </form>
                  <Button
                    color="primary"
                    size="sm"
                    className="fas fa-search"
                    type="Submit"
                    onClick={Item}
                  >
                  </Button>
                  <Button
                    color="primary"
                    size="sm"
                    className="fas fa-file-pdf"
                    type="Submit"
                    onClick={exportPDF}
                  >
                  </Button>
                </Row>
              </CardHeader>
              <Table id="myTable" className="align-items-center table-flush" >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ชื่อร้าน</th>
                    <th scope="col">เลขบิล</th>
                    <th scope="col">น้ำถัง</th>
                    <th scope="col">น้ำลัง</th>
                    <th scope="col">ขวดเพ็ท</th>
                    <th scope="col">จำนวนเงิน</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Sale_list.map((val, key) => {
                      return (
                        <tr>
                          <th scope="row">{val.name}</th>
                          <td>{val.number}</td>
                          <td>{val.tank}</td>
                          <td>{val.bottle}</td>
                          <td>{val.pet}</td>
                          <td>{((val.tank) * 50) + ((val.bottle) * 40) + ((val.pet) * 40)}</td>
                          <td><Button color="primary" size="sm"
                            onClick={() => { if (window.confirm(`ต้องการลบข้อมูลบิลหมายเลข ${val.number} หรือไม่`)) deleteI(val.number) }}><i class="fa fa-trash" /></Button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Card>
          </Col>

          <Col className="mb-5 mb-xl-0" xl="3">
            <Row className="mt-0">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">แก้ไขรายการขาย</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                  <Form>
                    <Table className="align-items-center table-flush" responsive>
                      <tbody>
                        <tr>
                        <td>
                        <Field class="form-control form-control-sm" type="number" name="Number" placeholder="เลขบิล" />
                        <ErrorMessage name="Number" component="div" className="text-danger" />
                        </td>
                        </tr>
                        <tr>
                        <td>
                        <Field class="form-control form-control-sm" type="number" name="Tank" placeholder="น้ำถัง 20 ลิตร" />
                        <ErrorMessage name="Tank" component="div" className="text-danger" />
                        </td>
                        </tr>
                        <tr>
                        <td>
                        <Field class="form-control form-control-sm" type="number" name="Bottle" placeholder="น้ำลัง 20 ขวด" />
                        <ErrorMessage name="Bottle" component="div" className="text-danger" />
                        </td>
                        </tr>
                        <tr>
                        <td>
                        <Field class="form-control form-control-sm" type="number" name="Pet" placeholder="ขวดเพ็ท1แพ็ค" />
                        <ErrorMessage name="Pet" component="div" className="text-danger" />
                        </td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className="col text-center">
                        <Button  className="my-4" color="primary" type="submit" >บันทึก</Button>
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

export default Index;
