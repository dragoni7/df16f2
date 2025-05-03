import { ExpandMoreOutlined } from '@mui/icons-material';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';

interface PrefillDataSourceProps {
  onOptionClicked: (option: string) => void;
  selectedOption: string;
  label: string;
  dataPrefix: string;
  options: string[];
}

/**
 * A list of data options for prefill mapping.
 * @param props
 * @returns
 */
export default function PrefillDataSource(props: PrefillDataSourceProps) {
  const { onOptionClicked, selectedOption, label, dataPrefix, options } = props;

  return (
    <Accordion
      disableGutters
      variant="outlined"
      elevation={0}
      sx={{ backgroundColor: 'transparent' }}
    >
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List dense>
          {options.map((option) => (
            <ListItemButton
              onClick={() => onOptionClicked(dataPrefix + '.' + option)}
              selected={selectedOption === dataPrefix + '.' + option}
              key={label + option}
            >
              <ListItemText primary={option} />
            </ListItemButton>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
