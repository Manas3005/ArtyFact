import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from "react";
import { useDispatch } from "react-redux"; // this is for the searched 
import {setNewSearchParam} from "/src/store/searchResultSlice.js";
import "/src/css/navBarStyle.css";


export default function ExploreDrawer(props) {
    console.log("PROPS IN EXPLORE", props);

    const dispatch = useDispatch();

    function updateCurrentExplore(setParam) {
        console.log("about to set params:", setParam);

        const searchParams1 = {
            style_title: setParam,
            limit: 60,
        };

        dispatch(setNewSearchParam(searchParams1));
    }

    const handleButtonClick = (action) => {
        console.log("This is the text", action);
        updateCurrentExplore(action); // Call the function passed as a prop
        window.location.hash = "#/searchResult";
    };

    const DrawerList = (
        <Box
            className="drawer-box"
            role="presentation"
            onClick={props.toggleDrawer(false)}
        >
            <List>
                {[
                    'Acrylic paintings (visual works)', 'Altarpiece', 'Drawings (visual works)',
                    'Etching europeanpainting', 'Ewer (vessel)', 'Handscroll', 'Mezzotint',
                    'Oil on board', 'Oil on canvas', 'Oil on panel', 'Painting', 'Saltcellar',
                    'Screensculpture', 'Table', 'Tankas (scrolls or banners)', 'Tempera',
                    'Textile',
                ].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            className="list-item-button"
                            onClick={() => handleButtonClick(text)}
                        >
                            <ListItemIcon className="list-item-icon">
                                {/* Add an icon or placeholder here */}
                            </ListItemIcon>


                            <ListItemText
                                primary={text}
                                className="list-item-text"
                            />

                            
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider className="divider" />
        </Box>
    );

    return (
        <Drawer
            open={props.open}
            onClose={props.toggleDrawer(false)}
            PaperProps={{
                className: "drawer-paper",
            }}
        >
            {DrawerList}
        </Drawer>
    );
}


