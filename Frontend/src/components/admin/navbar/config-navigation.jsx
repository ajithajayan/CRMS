// import SvgColor from 'src/components/svg-color';

import { Box } from "@mui/material";

// ----------------------------------------------------------------------

{/* <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} /> */}
const icon = (name) => (
  <Box
    component="span"
    className="svg-color"
    // ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(/assets/icons/navbar/${name}.svg) no-repeat center / contain`,
      WebkitMask: `url(/assets/icons/navbar/${name}.svg) no-repeat center / contain`,
      // width: 1,
      // height: 1,
    }}
  />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/admincontrol/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Order List',
    path: '/admincontrol/order',
    icon: icon('ic_blog'),
  },
  {
    title: 'Pending',
    path: '/admincontrol/pending-order',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
