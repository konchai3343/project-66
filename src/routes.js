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
import Index from "views/Index.js";
import Icons from "views/examples/Icons.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Login from "views/examples/Login.js";
import AllStock from "views/examples/AllStock";
import Order from "views/examples/Order";
import EditU from "views/examples/EditU";


var routes = [
  {
    path: "/index",
    name: "รายงานการขาย",
    icon: "fa-solid fa-money-check-dollar",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/AllStock",
    name: "การรายสต็อกทั้งหมด",
    icon: "fa-solid fa-bottle-water",
    component: <AllStock />,
    layout: "/admin",
  },
  {
    path: "/Produc",
    name: "บันทึกการผลิต",
    icon: "fa-solid fa-clipboard",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/SaleReport",
    name: "บันทึกรายการขาย",
    icon: "fa-solid fa-clipboard",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/Order",
    name: "คำสั่งซื้อ",
    icon: "fa-solid fa-cart-shopping",
    component: <Order />,
    layout: "/admin",
  },
  {
    path: "/EditU",
    name: "บัญชีผู้ใช้",
    icon: "fa-solid fa-user",
    component: <EditU />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "ออกจากระบบ",
    icon: "fa-solid fa-right-from-bracket",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/OrderProduc",
    component: <Profile />,
    layout: "/auth",
  },
];
export default routes;
