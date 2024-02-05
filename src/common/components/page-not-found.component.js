import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import notFound from "../../assets/404.jpg";

const PageNotFound = () => {
  return (
    <Container>
      <img
        src={notFound}
        style={{
          maxWidth: "100%",
          height: "auto",
          padding: 0,
          margin: 0,
        }}
      />
      <Typography variant="h3">This page could not be found</Typography>
    </Container>
  );
};

export default PageNotFound;
