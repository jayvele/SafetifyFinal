import PropTypes from 'prop-types';

import { NavLink as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
// @mui

import { Box, List, ListItemText } from '@mui/material';
import SvgColor from '../svg-color';
import AuthContext from '../../store/AuthContext';

//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// NavSection.propTypes = {
//   data: PropTypes.array,
// };

// export default function NavSection({ data = [], ...other }) {
//   return (
//     <Box {...other}>
//       <List disablePadding sx={{ p: 1 }}>
//         {data.map((item) => (
//           <NavItem key={item.title} item={item} />
//         ))}
//       </List>
//     </Box>
//   );
// }

export default function NavSection() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        <NavItem key={'dashboard'} title={'dashboard'} path={'/dashboard/app'} icon={icon('ic_analytics')} />
        {!authCtx.isLoggedIn && <NavItem key={'login'} title={'Login'} path={'/signUp'} icon={icon('ic_lock')} />}

        {authCtx.isLoggedIn && <NavItem key={'Profile'} title={'Profile'} path={'/profile'} icon={icon('ic_user')} />}

        {/* <NavItem key={'Product'} title={'Product'} path={'/dashboard/products'} icon={icon('ic_cart')} /> */}

        {authCtx.isLoggedIn && (
          <NavItem key={'Logout'} title={'Logout'} icon={icon('ic_lock')} onClick={logoutHandler} />
        )}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  icon: PropTypes.node,
  item: PropTypes.object,
  onClick: PropTypes.func,
};

function NavItem({ title, path, icon, onClick }) {
  // const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      onClick={onClick}
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {/* {onClick && onClick} */}

      {/* {info && info} */}
    </StyledNavItem>
  );
}
