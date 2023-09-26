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
import Axios from "axios"
import Chart from "chart.js";


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


const Order = (props) => {
  
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const [Sale_list, setsale_list] = useState([]);
  const Item = () => {
    Axios.get("http://localhost:3001/order").then((Response) => {
      setsale_list(Response.data);
    })
  }

  useEffect(() => {
    Item()
  });

  const deleteI = (name) => {
    Axios.delete(`http://localhost:3001/deletep/${name}`).then((Response) => {
    })
  }


  
  

  

  



  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--8" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">คำสั่งซื้อ</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table id="myTable" className="align-items-center table-flush" >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ชื่อลูกค้า</th>
                    <th scope="col">เบอร์โทร</th>
                    <th scope="col">ที่อยู่</th>
                    <th scope="col">ตำบล</th>
                    <th scope="col">อำเภอ</th>
                    <th scope="col">น้ำถัง</th>
                    <th scope="col">น้ำลัง</th>
                    <th scope="col">ขวดเพ็ท</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Sale_list.map((val, key) => {
                      return (
                        <tr>
                          <th scope="row">{val.name}</th>
                          <td>{val.tell}</td>
                          <td>{val.address}</td>
                          <td>{val.city}</td>
                          <td>{val.cunty}</td>
                          <td>{val.L_bot}</td>
                          <td>{val.M_bot}</td>
                          <td>{val.S_bot}</td>
                          <td><Button color="primary"size="sm"
                                    onClick={() => { if (window.confirm(`ต้องการลบข้อมูลบิลหมายเลข ${val.name} หรือไม่`)) deleteI(val.name) } }><i class="fa fa-trash" /></Button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>

      </Container>
    </>
  );
};

export default Order;
