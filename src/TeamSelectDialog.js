// ! External

import { get } from "lodash";
import { bool, func } from "prop-types";
import { Close, CheckCircle, ExpandMore, Person } from "@material-ui/icons";
import {
    Avatar,
    Card,
    Grid,
    CardHeader,
    Checkbox,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton,
    MenuItem,
    Typography,
    Select
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

// ! Internal

import { markets, roles, People } from "./Models";

import {
    ScardContent,
    Sdialog,
    SdialogActions,
    SdialogContent,
    SdialogTitle,
    SformHelperText,
    Spaper
} from "./styled-components.js";

// * use roles to create keys for team value object
const initialTeamValue = () => {
    return roles.reduce((accumulator, role) => {
        accumulator[role] = {
            role
        };
        return accumulator;
    }, {});
};

// * use roles to create keys for available team members object
const initalAvailableTeamMembersValue = () => {
    return roles.reduce((accumulator, role) => {
        accumulator[role] = [];
        return accumulator;
    }, {});
};

export default function TeamSelectDialog({ open, saveTeam, setIsDialogOpen }) {
    // ! State

    const [team, setTeam] = useState(initialTeamValue());
    const [isValid, setIsValid] = useState(false);
    const [expanded, setExpanded] = useState("");
    const [marketSelected, setMarketSelected] = useState("");
    const [availableTeamMembers, setAvailableTeamMembers] = useState(
        initalAvailableTeamMembersValue
    );

    // ! Effects
    // * watch for changes to marketSelected to reset team to initial
    // * and filter people by market
    useEffect(() => {
        if (marketSelected) {
            setTeam(initialTeamValue());
            const people = filterPeopleByMarket();
            sortAndSetByRole(people);
        }
    }, [marketSelected]);

    // * watch for changes to team and validate on change
    useEffect(() => {
        // * check each value on team to see if it has a name
        const validation = Object.values(team).every(role =>
            get(role, "name", false)
        );
        setIsValid(validation);
    }, [team]);

    // ! Methods

    const sortAndSetByRole = (filteredPeople = []) => {
        filteredPeople.forEach(person => {
            setAvailableTeamMembers(prevState => {
                return {
                    ...prevState,
                    [person.role]: [...prevState[person.role], person]
                };
            });
        });
    };

    const filterPeopleByMarket = () => {
        return People.filter(person => person.markets.includes(marketSelected));
    };

    const handleMarketChange = event => {
        // * reset availableTeamMembers on market change
        setAvailableTeamMembers(initalAvailableTeamMembersValue());
        setMarketSelected(event.target.value);
    };

    const handlePanelClick = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleTeamMemberChange = member => event => {
        // * handled check based on whether member was checked/unchecked
        if (event.target.checked) {
            setTeam(prevState => {
                return { ...prevState, [member.role]: member };
            });
        } else {
            setTeam(prevState => {
                return { ...prevState, [member.role]: { role: member.role } };
            });
        }
    };

    return (
        <Sdialog
            data-testid="select-team-dialog"
            id="select-team-dialog"
            fullWidth
            maxWidth="lg"
            aria-labelledby="team-select-dialog-title"
            open={open}
        >
            <SdialogTitle
                id="team-select-dialog-title"
                data-testid="team-select-dialog-title"
            >
                Build Your Team
            </SdialogTitle>
            <SdialogContent dividers>
                <Spaper team>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <FormControl>
                                <Select
                                    data-testid="select-market"
                                    value={marketSelected}
                                    onChange={handleMarketChange}
                                    name="Region"
                                    displayEmpty
                                >
                                    {markets.map(market => (
                                        <MenuItem
                                            data-testid={`menu-item-market-${market}`}
                                            key={market}
                                            value={market}
                                        >
                                            {market}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <SformHelperText error={!marketSelected}>
                                    Select Your Region
                                </SformHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container justify="center" spacing={3}>
                                {Object.values(team).map(role => (
                                    <Grid item xs>
                                        <Card
                                            data-testid={`team-member-role-card-${role}`}
                                        >
                                            <CardHeader
                                                title={
                                                    <Typography
                                                        variant="h5"
                                                        component="h2"
                                                    >
                                                        {role.role}
                                                    </Typography>
                                                }
                                                subheader={
                                                    <Typography
                                                        color="textSecondary"
                                                        gutterBottom
                                                    >
                                                        {get(
                                                            role,
                                                            "name",
                                                            false
                                                        )
                                                            ? role.name
                                                            : "None Selected"}
                                                    </Typography>
                                                }
                                            ></CardHeader>
                                            <ScardContent>
                                                {!get(
                                                    role,
                                                    "profilePic",
                                                    false
                                                ) ? (
                                                    <Person></Person>
                                                ) : (
                                                    <Avatar
                                                        alt={`${role.name} a ${role.role}`}
                                                        src={require(`${role.profilePic}`)}
                                                    />
                                                )}
                                            </ScardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Spaper>
                <Spaper options>
                    {roles.map(role => (
                        <ExpansionPanel
                            data-testid={`available-team-members-by-role-panel-${role}`}
                            disabled={!marketSelected}
                            key={role}
                            expanded={expanded === role}
                            onChange={handlePanelClick(role)}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMore />}
                                aria-controls={`${role}-content`}
                                id={`${role}-header`}
                            >
                                <Typography>{role}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Select One
                                    </FormLabel>
                                    <FormGroup>
                                        {availableTeamMembers[role].map(
                                            member => (
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    data-testid={`team-member-${role}-${member.name}`}
                                                                    checked={
                                                                        team[
                                                                            member
                                                                                .role
                                                                        ]
                                                                            .name ===
                                                                        member.name
                                                                    }
                                                                    onChange={handleTeamMemberChange(
                                                                        member
                                                                    )}
                                                                    value={
                                                                        member
                                                                    }
                                                                />
                                                            }
                                                            label={
                                                                <Grid
                                                                    container
                                                                    spacing={2}
                                                                    alignItems="center"
                                                                >
                                                                    <Grid item>
                                                                        <Avatar
                                                                            alt={
                                                                                member.name
                                                                            }
                                                                            src={require(`${member.profilePic}`)}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        {
                                                                            member.name
                                                                        }
                                                                    </Grid>
                                                                </Grid>
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>
                                            )
                                        )}
                                    </FormGroup>
                                </FormControl>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </Spaper>
            </SdialogContent>
            <SdialogActions>
                <IconButton onClick={() => setIsDialogOpen(false)}>
                    <Close></Close>
                </IconButton>
                <IconButton disabled={!isValid} onClick={saveTeam}>
                    <CheckCircle></CheckCircle>
                </IconButton>
            </SdialogActions>
        </Sdialog>
    );
}

TeamSelectDialog.propTypes = {
    open: bool,
    saveTeam: func,
    setIsDialogOpen: func
};
