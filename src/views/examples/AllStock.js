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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import ReactDatetime from "react-datetime";
import moment from 'moment';
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";







const AllStock = (props) => {


    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    //----------------------------------- for pro--------------------------------------------------//
    const [S, setS] = useState(0); const [OS, setOS] = useState(0); const [GS, setGS] = useState(0);
    const [FS, setFS] = useState(0); const [CS, setCS] = useState(0); const [DFS, setDFS] = useState(0); const [DCS, setDCS] = useState(0);

    const [L, setL] = useState(0); const [OL, setOL] = useState(0); const [GL, setGL] = useState(0);
    const [FL, setFL] = useState(0); const [CL, setCL] = useState(0); const [DFL, setDFL] = useState(0); const [DCL, setDCL] = useState(0);

    const [M, setM] = useState(0); const [OM, setOM] = useState(0); const [GM, setGM] = useState(0);
    const [FM, setFM] = useState(0); const [CM, setCM] = useState(0); const [DFM, setDFM] = useState(0); const [DCM, setDCM] = useState(0);

    const [Sale_list, setsale_list] = useState([]);

    //-------------------------- Search and Create Teble -------------------------------//
    const [Produc_Stock, setProduc_Stock] = useState([]);
    const todayDate = new Date().toLocaleDateString('en-CA')
    const [date, setDate] = useState('');
    const Item = () => {
        Axios.post("http://localhost:3001/allstock", {
            date: date
        }).then((Response) => {
            if (Response.data.length == 0) {
                alert('ไม่พบข้อมูล')
                O_pro()
            } else {
                setProduc_Stock(Response.data)
            }

        })
    }




    const checkday = () => {
        Axios.post("http://localhost:3001/check", {
            date: date
        })
            .then((Response) => {
                if (Response.data.length == 0) {
                    alert('ไม่พบข้อมูล')
                    O_pro()
                }
            })
    }
    const O_pro = () => {
        Axios.post("http://localhost:3001/new", {
            S: S, OS: OS, GS: GS, FS: FS, DFS: DFS, CS: CS, DCS: DCS,
            M: M, OM: OM, GM: GM, FM: FM, DFM: DFM, CM: CM, DCM: DCM,
            L: L, OL: OL, GL: GL, FL: FL, DFL: DFL, CL: CL, DCL: DCL, date: date
        })
    }

    //-------------------------------- Update Teble ------------------------------------//
    const update = (date) => {
        if (
            (S !== 0 && OS !== 0 && M !== 0 && OM !== 0 && L !== 0 && OL !== 0)
          ) {
        Axios.put("http://localhost:3001/update", {
            S: S, OS: OS,
            M: M, OM: OM,
            L: L, OL: OL,
            date: todayDate
        })
        alert('บันทึกข้อมูลสำเร็จ')
    }
    }



    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        setChartExample1Data("data" + index);
    };



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
                                        <h3 className="mb-0">รายการสต็อกทั้งหมด</h3>
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
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">รายการ</th>
                                        <th scope="col">จำนวนขวดเปล่า</th>
                                        <th scope="col">คำสั้งผลิต</th>
                                        <th scope="col">จำนวนผลิต</th>
                                        <th scope="col">หน้าโรงงาน</th>
                                        <th scope="col">ชำรุด</th>
                                        <th scope="col">บนรถ</th>
                                        <th scope="col">ชำรุด</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Produc_Stock.map((val, key) => {
                                            return (
                                                <><tr>
                                                    <th scope="row">น้ำถัง 20 ลิตร</th>
                                                    <td><Input placeholder={val.L_bot} type="number" onChange={(event) => { setL(event.target.value); }} /></td>
                                                    <td><Input placeholder={val.OL_bot} type="number" onChange={(event) => { setOL(event.target.value); }} /></td>
                                                    <td><Input placeholder={val.GL_bot} disabled type="text" onChange={(event) => { setGL(event.target.value); }} /></td>
                                                    <td><Input placeholder={val.FL_bot} disabled type="text" onChange={(event) => { setFL(event.target.value); }} /></td>
                                                    <td><Input placeholder={val.DFL_bot} disabled type="text" onChange={(event) => { setDFL(event.target.value); }} /></td>
                                                    <td><Input placeholder={val.CL_bot} disabled type="text" onChange={(event) => { setCL(event.target.value); }} /></td>
                                                    <td><Input placeholder={val.DCL_bot} disabled type="text" onChange={(event) => { setDCL(event.target.value); }} /></td>
                                                </tr>
                                                    <tr>
                                                        <th scope="row">น้ำลัง 20 ขวด</th>
                                                        <td><Input placeholder={val.M_bot} type="number" onChange={(event) => { setM(event.target.value); }} /></td>
                                                        <td><Input placeholder={val.OM_bot} type="number" onChange={(event) => { setOM(event.target.value); }} /></td>
                                                        <td><Input placeholder={val.GM_bot} disabled type="text" onChange={(event) => { setGM(event.target.value); }} /></td>
                                                        <td><Input placeholder={val.FM_bot} disabled type="text" onChange={(event) => { setFM(event.target.value); }} /></td>
                                                        <td><Input placeholder={val.DFM_bot} disabled type="text" onChange={(event) => { setDFM(event.target.value); }} /></td>
                                                        <td><Input placeholder={val.CM_bot} disabled type="text" onChange={(event) => { setCM(event.target.value); }} /></td>
                                                        <td><Input placeholder={val.DCM_bot} disabled type="text" onChange={(event) => { setDCM(event.target.value); }} /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">ขวดเพ็ท</th>
                                                        <td><Input placeholder={val.S_bot} type="number" onChange={(event) => { setS(event.target.value); }} /></td>
                                                        <td><Input placeholder={val.OS_bot} type="number" onChange={(event) => { setOS(event.target.value); }} /></td>
                                                        <td><Input placeholder={val.GS_bot} disabled type="text" onChange={(event) => { setGS(event.target.value); }} /></td>
                                                        <td><Input placeholder={val.FS_bot} disabled type="text" onChange={(event) => { setFS(event.target.value); }} /></td>
                                                        <td><Input placeholder={val.DFS_bot} disabled type="text" onChange={(event) => { setDFS(event.target.value); }} /></td>
                                                        <td><Input placeholder={val.CS_bot} disabled type="text" onChange={(event) => { setCS(event.target.value); }} /></td>
                                                        <td><Input placeholder={val.DCS_bot} disabled type="text" onChange={(event) => { setDCS(event.target.value); }} /></td>
                                                    </tr>


                                                </>
                                            )
                                        }
                                        )}
                                </tbody>
                            </Table>
                            <div className="col text-center">
                                <Button color="primary" className="my-4" type="Submit" onClick={update} > บันทึก </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default AllStock;
