import * as React from 'react';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PinIcon from '@mui/icons-material/Pin';

const actions = [
  { color: '', icon: <SpeedDialIcon />, name: 'KimlikNo', id:4, value:"tc"},
  { color: 'blue', icon: <PinIcon />, name: 'RaporNo', id: 1, value:"id" },
  { color: 'secondary', icon: <CalendarMonthIcon />, name: 'Tarih', id: 2, value:"reportDate"},
  { color: '', icon: <BadgeIcon />, name: 'İsim', id:3, value:"fullName"}
];

export default function SpeedDialTooltipOpen({handleSort}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handle(sort) { handleSort(null,null,sort); handleClose();
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<>sırala</>}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => handle(action.value)}
          color={action.color}
        />
      ))}
    </SpeedDial>
  );
}