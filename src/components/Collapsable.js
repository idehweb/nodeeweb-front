import React, {useState} from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {
  isClient,
} from "#c/functions/index";
const Collapsable = (props) => {
  let url = isClient ? new URL(window.location.href) : "";

  let {title, values,slug,defaultStatus=false} = props;
  const [open, setOpen] = useState(defaultStatus);

  const handleClick = () => {
    setOpen(!open);
  };

  return (<List
    dir="rtl"
    sx={{width: '100%', bgcolor: 'background.paper'}}
    component="nav"
    aria-labelledby="nested-list-subheader"
  >
    <ListItemButton onClick={handleClick}>
      <ListItemText primary={title}/>
      {open ? <ExpandLess/> : <ExpandMore/>}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {values && values.map((ij, idxx2) => {
          url.searchParams.set(slug, ij.slug);
          url.searchParams.set('offset', 0);

          return(
            <Link to={url.pathname + url.search}>
              <ListItemButton sx={{pl: 4}} alignItems="flex-end">

                <ListItemText primary={ij.name.fa}/>
              </ListItemButton>
            </Link>
          )
        })}

      </List>
    </Collapse>
  </List>);
}
// {/*<Link to={'/' + slug + '/' + ij.slug + '/'}>*/}

export default withTranslation()(Collapsable);
