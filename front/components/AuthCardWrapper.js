import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';
import {
	Stack,
} from '@mui/material';
// project import
// import MainCard from '../../ui-component/cards/MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }) => (
	<Stack
		sx={{
			width: '100%',
			maxWidth: 768,
			// margin: { xs: 2.5, md: 3 },
			'& > *': {
				flexGrow: 1,
				flexBasis: '50%',
			},
			alignSelf: 'center',
		}}
		content={false}
		{...other}
		border={false}
	>
		<Box sx={{ px: { xs: 2, sm: 8 }, py: { xs: 2, sm: 4 }, height: '100%' }}>{children}</Box>
	</Stack>
);

AuthCardWrapper.propTypes = {
	children: PropTypes.node,
};

export default AuthCardWrapper;
