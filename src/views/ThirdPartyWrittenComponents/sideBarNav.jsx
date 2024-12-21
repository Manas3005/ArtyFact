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


export default function ExploreDrawer(props) {
        console.log("PROPS IN EXPLORE",props)


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
        <Box sx={{ width: 260 }} role="presentation" onClick={props.toggleDrawer(false)}>
            <List>
                {[
                    'Acrylic paintings (visual works)', 'Altarpiece', 'Drawings (visual works)',
                    'Etching europeanpainting', 'Ewer (vessel)', 'Handscroll', 'Mezzotint',
                    'Oil on board', 'Oil on canvas', 'Oil on panel', 'Painting', 'Saltcellar',
                    'Screensculpture', 'Table', 'Tankas (scrolls or banners)', 'Tempera',
                    'Textile',
                ].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => handleButtonClick(text)}>
                            <ListItemIcon>{/* Add your icons here */}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return <Drawer open={props.open} onClose={props.toggleDrawer(false)}>{DrawerList}</Drawer>;
}



