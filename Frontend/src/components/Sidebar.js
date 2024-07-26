import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../bootstrap.min.css";
import { Button, Card } from "react-bootstrap";
import ItemList from "../components/UI/ItemList";
import LandingPage from "../components/UI/Landing";
import NSWPrintPdf from "../components/APIs/NSW-Print-Pdf.js";
import QRCode from "../components/APIs/QR-Code.js";
import DynamicDate from "../components/APIs/Dynamic-Date.js";
import EscalationTool from "../components/APIs/EscalationTool";
import EscalationSlackbot from "../components/APIs/EscalationSlackbot";
import NewsletterMocker from "../components/APIs/NewsletterMocker";
import MWTRLogin from "../components/APIs/MWTRLogin";
import MFeeds from "../components/APIs/MFeeds";
import MWFeeds from "../components/APIs/MWFeeds";
import ApiForm from "../components/UI/APIForm";
import { Route, Routes } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import "semantic-ui-css/semantic.min.css";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tooltip from "@mui/joy/Tooltip";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListItem, ListItemIcon, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DateRangeIcon from "@mui/icons-material/DateRange";
import QrCodeIcon from "@mui/icons-material/QrCode";
import BuildIcon from "@mui/icons-material/Build";
import LoginIcon from "@mui/icons-material/Login";
import FeedIcon from "@mui/icons-material/Feed";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Header from "./UI/Header.js";
import Footer from "../components/UI/Footer";
const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Define the list of items
  const itemList = ItemList();

  // Filter the list based on the search term
  const filteredItems = itemList.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Define a mapping of item labels to icons
  const iconMap = {
    "NSW Print PDF": <PictureAsPdfIcon />,
    "Dynamic Date": <DateRangeIcon />,
    "QR Code": <QrCodeIcon />,
    "Escalation Tool": <BuildIcon />,
    "Escalation Slackbot": <SmartToyIcon />,
    "MWTR Login": <LoginIcon />,
    "Newsletter Mocker": <NewspaperIcon />,
    MFeeds: <RssFeedIcon />,
    "MW Feeds": <FeedIcon />,
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ backgroundColor: "#f0f5fa" }}>
          <IconButton
            color="#485785"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <Tooltip title="Expand">
              <MenuIcon />
            </Tooltip>
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <h3
            style={{
              textAlign: "center",
              fontSize: "18px",
              marginTop: "15px",
            }}
          >
            Custom Solutions
          </h3>
          <IconButton onClick={handleDrawerClose}>
            <Tooltip title="Collapse">
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </Tooltip>
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List style={{ backgroundColor: "#f0f5fa", overflow: "hidden" }}>
          <ListItem>
            <div className="apiListScroll">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ marginRight: 1 }}
                  style={{
                    marginLeft: "1px",
                    marginRight: "6px",
                    paddingRight: "22px",
                  }}
                >
                  <Tooltip title="Search">
                    <SearchIcon />
                  </Tooltip>
                </IconButton>
                <TextField
                  placeholder="Search for your API..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    style: {
                      fontFamily: "Montserrat",
                      width: "22vh",
                      height: "5vh",
                      padding: "3px",
                      fontSize: "13px",
                      borderRadius: "25px",
                      border: "3px solid #375e9433",
                      textAlign: "center",
                      boxShadow: "1px 2px 9px #375e9433",
                    },
                  }}
                />
              </Box>
              <ul className="orderedList">
                {filteredItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <li className="py-3 listItems">
                      <Link
                        to={item.to}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <ListItemIcon style={{ padding: "0px", margin: "0px" }}>
                          <Tooltip title={item.label}>
                            {iconMap[item.label]}
                          </Tooltip>
                        </ListItemIcon>
                        <Button className="sidebarButton">{item.label}</Button>
                      </Link>
                    </li>
                    <Divider variant="middle" />
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </ListItem>
        </List>
        <Card style={{ bottom: "0", position: "absolute", width: "100%" }}>
          <Card.Body>
            <Card.Text>
              <div>
                <span>
                  <i
                    className="fa-brands fa-watchman-monitoring fa-2xl fa-fade"
                    style={{ marginRight: "20px", color: "#5474ab" }}
                  ></i>
                </span>
                <span>Watchtower</span>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 2 }}>
        <DrawerHeader />
        <main>
          <Container>
            <Table>
              <Row>
                <Col>
                  <div className="apiContainer">
                    <Routes>
                      <Route path="/" Component={LandingPage} />
                      <Route path="/NSWPrintPdf" Component={NSWPrintPdf} />
                      <Route path="/DynamicDate" Component={DynamicDate} />
                      <Route path="/QRCode" Component={QRCode} />
                      <Route
                        path="/EscalationTool"
                        Component={EscalationTool}
                      />
                      <Route
                        path="/EscalationSlackbot"
                        Component={EscalationSlackbot}
                      />
                      <Route path="/MWTRLogin" Component={MWTRLogin} />
                      <Route
                        path="/NewsletterMocker"
                        Component={NewsletterMocker}
                      />
                      <Route path="/MFeeds" Component={MFeeds} />
                      <Route path="/MWFeeds" Component={MWFeeds} />
                      <Route path="/ApiForm" Component={ApiForm} />
                    </Routes>
                  </div>
                  <Footer />
                </Col>
              </Row>
            </Table>
          </Container>
        </main>
        <br />
      </Box>
    </Box>
  );
}
