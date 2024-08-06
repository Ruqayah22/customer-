import React from "react";
import { Box, Typography } from "@mui/material";
import HomeMenu from "../components/HomeMenu";
import "./Home.css";

const Home = () => {
  return (
    <Box className="homeBox">
      <HomeMenu />
      <Typography className="Ty1" gutterBottom variant="h1">
        شركة النوفلي
      </Typography>
      <Typography className="Ty2" gutterBottom variant="h2">
        للحدادة العامة
      </Typography>
      <Typography className="Ty3" variant="h5">
        لعمل معامل الطحين الجملونات الابواب
      </Typography>
      <Typography className="Ty4" variant="h5">
        والشبابيك قص وثني الحديد تجارة الحديد
      </Typography>
    </Box>
  );
};

export default Home;
