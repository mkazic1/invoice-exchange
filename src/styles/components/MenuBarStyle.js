export const menuOptionsStyle = {
  marginTop: '80px',
  marginX: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
};

export const menuButtonsStyle = {
  display: 'flex',
  flexDirection: 'row',
  borderRadius: '4px',
  color: 'text.secondary',
  width: '180px',
  '&:hover': {
    backgroundColor: 'secondary.main',
    border: 'none',
    color: 'text.primary',
  },
};

export const menuIconsStyle = {
  color: 'secondary.main',
  minWidth: 0,
  paddingRight: '10px',
};
