// ! External

import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import {
    CardContent,
    FormHelperText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper
} from "@material-ui/core";

export const ScardContent = styled(CardContent)`
    min-height: 2.5em;
`;

export const SformHelperText = styled(FormHelperText)`
    color: ${props => (props.error ? "red" : "inherit")};
`;

export const Spaper = styled(Paper)`
    margin: 2rem 0;
    padding: ${props => (props.team ? "2rem" : "auto")};
`;

export const Sdialog = withStyles(theme => ({
    root: {
        minHeight: "80vh",
        maxHeight: "90vh"
    }
}))(Dialog);

export const SdialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        overflow: "scroll"
    }
}))(DialogContent);

export const SdialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}))(DialogActions);

export const SdialogTitle = withStyles(theme => ({
    root: {
        fontSize: "3rem",
        margin: 0,
        padding: "1rem"
    }
}))(DialogTitle);
