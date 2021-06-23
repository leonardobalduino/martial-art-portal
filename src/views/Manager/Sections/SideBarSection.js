import React from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
// core components
import SideBar from "components/SideBar/SideBar.js";
// @material-ui/icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import GestureIcon from "@material-ui/icons/Gesture";

export default function SideBarSection() {
  let history = useHistory();
  let menuText = {
    person: {
      text: "Pessoa",
      img: <PersonIcon />,
      content: "personList",
    },
    graduation: {
      text: "Graduação",
      img: <GestureIcon />,
      content: "graduationList",
    },
  };

  function itemMenu(menu) {
    return (
      <ListItem
        button
        key={menu.text}
        onClick={() => loadContent(menu.content)}
      >
        <ListItemIcon>{menu.img}</ListItemIcon>
        <ListItemText primary={menu.text} />
      </ListItem>
    );
  }

  function loadContent(content) {
    return history.push("/manager/" + content);
  }
  return (
    <SideBar
      brand={process.env.REACT_APP_BRAND + " - Área administrativa"}
      menuLinks={
        <List>
          {itemMenu(menuText.person)}
          {itemMenu(menuText.graduation)}
          <Divider />
          <ListItem
            button
            key="Sair"
            onClick={() => history.push("/login-page")}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      }
    />
  );
}
