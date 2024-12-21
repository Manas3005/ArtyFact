import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { testAPI, getArtWorks, getArtWorkImage, URLParamsForImage, getCollection,getArtWorksSearch} from '/src/apiCall.js';
import { useState } from "react";


export default function ExploreDrawer({ open, toggleDrawer ,onExplore}) {

            const [idData, setIdData] = useState(null);


    function handleButtonClick(action){
        //console.log(`${action} button clicked`);
        // You can add navigation, API calls, or other logic here
           
       
        console.log("This is the text", action)
        
       
            onExplore(action);

            window.location.hash="#/searchResult";
        
    };


    const DrawerList = (
        <Box sx={{ width: 260 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>  

                {['Acrylic paintings (visual works)', 'Altarpiece', 'Drawings (visual works)',
                'Etching europeanpainting', 'Ewer (vessel)', 'Handscroll', 'Mezzotint', 
                   'Oil on board', 'Oil on canvas', 'Oil on panel', 'Painting', 'Saltcellar', 
                   'Screensculpture', 'Table', 'Tankas (scrolls or banners)', 'Tempera', 
                   'Textile'
                     ].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => handleButtonClick(text)}> 
                            <ListItemIcon>
                                {/* Add your icons here */}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}

            </List>
            <Divider />
           
        </Box>
    );

    return (
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    );
}



