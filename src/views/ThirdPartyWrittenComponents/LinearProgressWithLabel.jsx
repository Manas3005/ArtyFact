import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  
    return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1, length: '50px' }}>
        <LinearProgress variant="determinate" {...props} 
        sx={{
            height: 18, 
          }}/>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '1.2rem', "padding-top": "8px", "padding-right": "12px"}}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel(props) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value = {props.updatedProgress} className = "progressBar"/> {/*Showing the updated value passed from the presenter through the artQuiz view*/}
    </Box>
  );
}