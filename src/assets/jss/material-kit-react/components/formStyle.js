import { makeStyles } from "@material-ui/core/styles";

const formStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  inputSmall: {
    width: "10ch",
  },
  inputMedium: {
    width: "30ch",
  },
  inputLarge: {
    width: "100ch",
  },
  invisible: {
    display: "none",
  },
  center: {
    textAlign: "center",
  },
  errorPosition: {
    top: "70px",
    position: "fixed",
  },
}));

export default formStyles;
