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
import Icons from "views/examples/Icons.js";
import Maps from "views/examples/Maps.js";
import Stock from "views/examples/M_Stock";
import Login from "views/examples/Login";

var routes3 = [
  
  {
    path: "/Produc",
    name: "บันทึกการผลิต (พนักงานผลิต)",
    icon: "fa-solid fa-clipboard",
    component: <Icons />,
    layout: "/manufac",
  },
  {
    path: "/Stock",
    name: "บันทึกสต็อก (พนักงานผลิต)",
    icon: "fa-solid fa-clipboard",
    component: <Stock />,
    layout: "/manufac",
  },
  {
    path: "/SaleReport",
    name: "บันทึกรายการขาย (พนักงานผลิต)",
    icon: "fa-solid fa-clipboard",
    component: <Maps />,
    layout: "/manufac",
  },
  {
    path: "/login",
    name: "ออกจากระบบ",
    icon: "fa-solid fa-right-from-bracket",
    component: <Login />,
    layout: "/auth",
  },
];
export default routes3;
