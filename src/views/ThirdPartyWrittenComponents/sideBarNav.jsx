import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { testAPI, getArtWorks, getArtWorkImage, URLParamsForImage, getCollection} from '/src/apiCall.js';


export default function ExploreDrawer({ open, toggleDrawer }) {


    const handleButtonClick = (action) => {
        //console.log(`${action} button clicked`);
        // You can add navigation, API calls, or other logic here
        

        const searchParams = {
       
        };

      
        action === 'CITYSCAPES'
        ? console.log("Why did you click on CITYSCAPES?",getCollection(searchParams))
        : action === 'IMPRESSIONISM'
        ? console.log("Why did you click on IMPRESSIONISM?")
        : action === 'ANIMAL'
        ? console.log("Why did you click on ANIMAL?")
        : action === 'ESSENTIALS'
        ? console.log("Why did you click on ESSENTIALS?")
        : action === 'AFRICAN DIASPORA'
        ? console.log("Why did you click on AFRICAN DIASPORA?")
        : action === 'FASHION'
        ? console.log("Why did you click on FASHION?")
        : action === 'CHICAGO ARTIST'
        ? console.log("Why did you click on CHICAGO ARTIST?")
        : action === 'POP ART'
        ? console.log("Why did you click on POP ART?")
        : action === 'MYTHOLOGY'
        ? console.log("Why did you click on MYTHOLOGY?")
        : action === 'SURREALISM'
        ? console.log("Why did you click on SURREALISM?")
        : action === 'ARMS ARMOR'
        ? console.log("Why did you click on ARMS ARMOR?")
        : action === 'PORTRAITS'
        ? console.log("Why did you click on PORTRAITS?")
        : action === 'MASKS'
        ? console.log("Why did you click on MASKS?")
        : action === 'DRINKING AND DINING'
        ? console.log("Why did you click on DRINKING AND DINING?")
        : action === '21ST Century'
        ? console.log("Why did you click on 21ST Century?")
        : action === 'ARCHITECTURE'
        ? console.log("Why did you click on ARCHITECTURE?")
        : action === 'LANDSCAPES'
        ? console.log("Why did you click on LANDSCAPES?")
        : action === 'ART DECO'
        ? console.log("Why did you click on ART DECO?")
        : action === 'ANCIENT'
        ? console.log("Why did you click on ANCIENT?")
        : action === 'MINITURE'
        ? console.log("Why did you click on MINITURE?")
        : action === 'WOODBLOCK PRINT'
        ? console.log("Why did you click on WOODBLOCK PRINT?")
        : action === 'STILL LIFE'
        ? console.log("Why did you click on STILL LIFE?")
        : action === 'MODERNISM'
        ? console.log("Why did you click on MODERNISM?")
        : console.log(`No specific action for ${action}`);



    };


    const DrawerList = (
        <Box sx={{ width: 260 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>  

                {['CITYSCAPES', 'IMPRESSIONISM', 'ANIMAL', 'ESSENTIALS',
                'AFRICAN DIASPORA', 'FASHION', 'CHICAGO ARTIST', 'POP ART' , 'MYTHOLOGY',
                'SURREALISM', 'ARMS ARMOR', 'PORTRAITS', 'MASKS','DRINKING AND DINING',
                'FURNITURE','21ST Century','ARCHITECTURE','LANDSCAPES','ART DECO','ANCIENT','MINITURE',
                'WOODBLOCK PRINT', 'STILL LIFE','MODERNISM'
            
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
            <List>

                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {/* Add your icons here */}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}

            </List>
        </Box>
    );

    return (
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    );
}
