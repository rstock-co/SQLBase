import { Box } from "@mui/material";
import { styled } from "@mui/material";
import ParticlesPartial from "./ParticlesPartial";


const PurpleBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  paddingBottom: '10%',
}))

// const PurpleBox = styled(ParticlesPartial)(({ theme }) => ({
//   zIndex: -1
// }))

export default PurpleBox;