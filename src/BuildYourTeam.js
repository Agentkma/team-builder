// ! External

import React from "react";
import { Button, Grid } from "@material-ui/core";

function BuildYourTeam({ setIsDialogOpen }) {
    return (
        <Grid
            data-testid="build-your-team-button"
            id="build-your-team-button"
            container
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <Button
                    data-testid={"button-build-your-team"}
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        setIsDialogOpen(true);
                    }}
                >
                    Build Your Team!
                </Button>
            </Grid>
        </Grid>
    );
}

export default BuildYourTeam;
