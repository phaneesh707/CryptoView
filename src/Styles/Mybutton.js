// to override or create new theeme do this

import { Button } from "@mui/material";
import { styled } from "@mui/system";

const MyButton = styled(Button)(()=>({
    borderRadius:'23px'
}))

export default MyButton;