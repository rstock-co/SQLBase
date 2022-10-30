import { Box } from "@mui/material";
import { styled } from "@mui/material";


const PurpleBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main
}))

export default PurpleBox;