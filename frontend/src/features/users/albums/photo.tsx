import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import cssStyles from "utils/cssStyles";

const PhotoCard: FC<PhotoCardProps> = ({ title, image_url, id }) => {
  return (
    <Grid item xs={12} sm={4}>
      <Card
        variant="outlined"
        sx={cssStyles.glass({
          opacity: 0.6,
          bg: "#ffffff",
          border: {
            opacity: 1,
          },
        })}
      >
        <CardContent>
          <Typography color={"primary"} variant="subtitle2" py={1}>
            {title}
          </Typography>
          <Box
            sx={{
              height: 300,
              width: "100%",
            }}
          >
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img
                style={{
                  height: "100%",
                  width: "100%",
                }}
                src={image_url}
                alt={title}
              />
            }
          </Box>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

type PhotoCardProps = {
  title: string;
  image_url: string;
  id: number;
};

export default PhotoCard;
