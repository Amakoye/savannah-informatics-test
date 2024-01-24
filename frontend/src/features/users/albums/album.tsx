import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NextLink from "components/NextLink";
import { FC } from "react";

const AlbumCard: FC<{
  title: string;
  id: number;
  user_id: number;
  owner: string;
}> = ({ title, user_id, id, owner }) => {
  return (
    <Grid item xs={12} sm={4}>
      <Card sx={{ display: "flex" }}>
        <Box width={"35%"} sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {owner}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Button variant="outlined" size="small">
              <NextLink href={`/users/albums/${id}/album`}>View album</NextLink>
            </Button>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: "65%" }}
          image="/images/illustrations/album.jpg"
          alt="Live from space album cover"
        />
      </Card>
    </Grid>
  );
};

export default AlbumCard;
