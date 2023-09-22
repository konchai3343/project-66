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


import Maps from "views/examples/Maps.js";
import Stock from "views/examples/D_Stock";
import Login from "views/examples/Login";


var routes2 = [
  
  {
    path: "/Stock",
    name: "บันทึกสต็อก (พนักงานส่งน้ำ)",
    icon: "fa-solid fa-clipboard",
    component: <Stock />,
    layout: "/deliver",
  },
  {
    path: "/SaleReport",
    name: "บันทึกรายการขาย (พนักงานส่งน้ำ)",
    icon: "fa-solid fa-clipboard",
    component: <Maps />,
    layout: "/deliver",
  },
  {
    path: "/login",
    name: "ออกจากระบบ",
    icon: "fa-solid fa-right-from-bracket",
    component: <Login />,
    layout: "/auth",
  },
];
export default routes2;
