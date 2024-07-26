// // App.js

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Container, Col, Row, Table } from "react-bootstrap";
// import "semantic-ui-css/semantic.min.css";

// import Landing from "./components/UI/Landing";
// import Sidebar from "./components/UI/Sidebar";
// import NSWPrintPdf from "./components/APIs/NSW-Print-Pdf";
// import QRCode from "./components/APIs/QR-Code";
// import DynamicDate from "./components/APIs/Dynamic-Date";
// import EscalationTool from "./components/APIs/EscalationTool";
// import EscalationSlackbot from "./components/APIs/EscalationSlackbot";
// import NewsletterMocker from "./components/APIs/NewsletterMocker";
// import MWTRLogin from "./components/APIs/MWTRLogin";
// import MFeeds from "./components/APIs/MFeeds";
// import MWFeeds from "./components/APIs/MWFeeds";

// import "./App.css";
// // import "./App.scss"
// import Header from "./components/UI/Header";
// import Footer from "./components/UI/Footer";
// import ApiForm from "./components/UI/APIForm";

// const App = () => {
//   return (
//     <Router>
//       <Header></Header>
//       <br />
//       <main className="content">
//         <Container>
//           <Table style={{ height: "80%", width: "100%" }}>
//             <Row>
//               <Col style={{ width: "30%", align: "center" }}>
//                 <Sidebar></Sidebar>
//               </Col>
//               <Col
//                 valign="top"
//                 style={{ width: "70%", align: "center", borderRadius: "20px" }}
//               >
//                 <div className="apiContent">
//                   <Routes>
//                     <Route path="/" Component={Landing} />
//                     <Route path="/NSWPrintPdf" Component={NSWPrintPdf} />
//                     <Route path="/DynamicDate" Component={DynamicDate} />
//                     <Route path="/QRCode" Component={QRCode} />
//                     <Route path="/EscalationTool" Component={EscalationTool} />
//                     <Route
//                       path="/EscalationSlackbot"
//                       Component={EscalationSlackbot}
//                     />
//                     <Route path="/MWTRLogin" Component={MWTRLogin} />
//                     <Route
//                       path="/NewsletterMocker"
//                       Component={NewsletterMocker}
//                     />
//                     <Route path="/MFeeds" Component={MFeeds} />
//                     <Route path="/MWFeeds" Component={MWFeeds} />
//                     <Route path="/ApiForm" Component={ApiForm} />
//                   </Routes>
//                 </div>
//               </Col>
//             </Row>
//           </Table>
//         </Container>
//       </main>
//       <Footer></Footer>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Sidebar from "../src/components/Sidebar";
import "./App.css";
// import "./App.scss"
const App = () => {
  
  return (
    <Router>
      <Sidebar></Sidebar>
    </Router>
  );
};
export default App;
