import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import notAuth from "../../assets/no_auth.jpg";

const PageNotAuth = () => {
  return (
    <Container>
      <img
        src={notAuth}
        style={{
          maxWidth: "100%",
          height: "auto",
          padding: 0,
          margin: 0,
        }}
      />
      <Typography variant="h3">You are not authorized</Typography>
    </Container>
  );
};

export default PageNotAuth;
