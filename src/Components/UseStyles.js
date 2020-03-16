
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
      display: "flex"
    },
    container: {
      flexGrow: 1,
      height: 800
    },
    paper: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    toolbar: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(4)
    },
    title: {
      flex: "0 0 auto"
    },
    spacer: {
      flex: "1 1 100%"
    }
  }));
export default useStyles  