import AuthLayout from "../../components/auth/layout/AuthLayout";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";

interface IconType {
  label: string;
  route: string;
}

const icons: IconType[] = [
  {
    label: "Child, Youth, and Family Members",
    route: "/cyfms",
  },
  {
    label: "Initial Contacts",
    route: "/ic",
  },
  {
    label: "Wellness Journey",
    route: "/wj",
  },
  {
    label: "Cultural Programs and Activities",
    route: "/cpa",
  },
  { label: "Caregivers", route: "/cg" },
  { label: "Reports", route: "/reports" },
  { label: "Notifications", route: "/notifications" },
];

/**
 * `HomePage`
 */
const HomePage: FC = () => {
  return (
    <AuthLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem 1rem",
            justifyContent: "center",
            maxWidth: "768px",
          }}
        >
          {icons.map((icon) => (
            <Link
              key={icon.route}
              to={icon.route}
              style={{ textDecoration: "none" }}
            >
              <Card elevation={0} sx={{ width: 150 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100px"
                    image={"/img/logo-encircled.svg"}
                    alt=""
                  />
                  <CardContent>
                    <Typography
                      component="h2"
                      variant="body1"
                      sx={{ fontSize: "0.7rem", textAlign: "center" }}
                    >
                      {icon.label}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default HomePage;
