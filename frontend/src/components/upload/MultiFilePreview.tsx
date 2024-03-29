import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
// @mui
import { alpha } from "@mui/material/styles";
import { varFade } from "components/animate";
import Iconify from "components/Iconify";
//
import Image from "components/Image";
import { AnimatePresence, motion } from "framer-motion";
import isString from "lodash.isstring";
// utils
import { fData } from "utils/formatNumber";
// type
import { CustomFile, UploadMultiFileProps } from "./type";

// ----------------------------------------------------------------------

const getFileData = (file: CustomFile | string) => {
  if (typeof file === "string") {
    return {
      key: file,
    };
  }
  return {
    key: file.name,
    name: file.name,
    size: file.size,
    preview: file.preview,
  };
};

// ----------------------------------------------------------------------

export default function MultiFilePreview({
  showPreview = false,
  files,
  onRemove,
  onRemoveAll,
}: UploadMultiFileProps) {
  const hasFile = files.length > 0;

  return (
    <>
      <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
        <AnimatePresence>
          {files.map((file) => {
            const { key, name, size, preview } = getFileData(
              file as CustomFile
            );

            if (showPreview) {
              return (
                <ListItem
                  key={key}
                  component={motion.div}
                  {...varFade().inRight}
                  sx={{
                    p: 0,
                    m: 0.5,
                    width: 80,
                    height: 80,
                    borderRadius: 1.25,
                    overflow: "hidden",
                    position: "relative",
                    display: "inline-flex",
                    border: (theme) => `solid 1px ${theme.palette.divider}`,
                  }}
                >
                  <Image
                    alt="preview"
                    src={isString(file) ? file : preview}
                    ratio="1/1"
                  />
                  <IconButton
                    size="small"
                    onClick={() => onRemove(file)}
                    sx={{
                      top: 6,
                      p: "2px",
                      right: 6,
                      position: "absolute",
                      color: "common.white",
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.grey[900], 0.48),
                      },
                    }}
                  >
                    <Iconify icon={"eva:close-fill"} />
                  </IconButton>
                </ListItem>
              );
            }

            return (
              <ListItem
                key={key}
                component={motion.div}
                {...varFade().inRight}
                sx={{
                  my: 1,
                  px: 2,
                  py: 0.75,
                  borderRadius: 0.75,
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
              >
                <Iconify
                  icon={"eva:file-fill"}
                  sx={{ width: 28, height: 28, color: "text.secondary", mr: 2 }}
                />

                <ListItemText
                  primary={isString(file) ? file : name}
                  secondary={isString(file) ? "" : fData(size || 0)}
                  primaryTypographyProps={{ variant: "subtitle2" }}
                  secondaryTypographyProps={{ variant: "caption" }}
                />

                <IconButton
                  edge="end"
                  size="small"
                  onClick={() => onRemove(file)}
                >
                  <Iconify icon={"eva:close-fill"} />
                </IconButton>
              </ListItem>
            );
          })}
        </AnimatePresence>
      </List>

      {hasFile && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button size="small" variant="contained">
            Upload files
          </Button>
        </Stack>
      )}
    </>
  );
}
