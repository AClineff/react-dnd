import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, IconButton, Fab, Button, withStyles, WithStyles } from '@material-ui/core';
import {Plus, Menu} from 'react-feather';
import { CombatContext } from '../shared/context/combatContext';
import CreateCharacterDialog from './createCharacterDialog';

const styles = () => ({
    plusFab: {
        marginLeft: "auto"
    },
    combatButton: {
        margin: "0 20px"
    }
})

interface OwnProps {
    toggleCombat: any // todo ts issue
}

type Props = OwnProps & WithStyles;

const Header: React.FunctionComponent<Props> = (props: Props) => {
    const {classes, toggleCombat} = props;
    const inCombat = useContext(CombatContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleClickOpen = () => {
        setIsOpen(true);
    }
    
    const handleClose = () => {
        setIsOpen(false);
    }
    return (
        <AppBar>
            <Toolbar>
                <IconButton>
                    <Menu />
                </IconButton>
                <Typography variant="h6" color="inherit">
                    DM Tool v0.1
                </Typography>
                {
                    inCombat ? (
                        <Button variant="contained" className={classes.combatButton} color="default" onClick={toggleCombat}>
                            End Combat
                        </Button>
                    ):(
                        <Button variant="contained" className={classes.combatButton} color="secondary" onClick={toggleCombat}>
                            Start Combat
                        </Button>
                    )
                }
                <Fab color="secondary" className={classes.plusFab} onClick={handleClickOpen}>
                    <Plus />
                </Fab>
            </Toolbar>
            <CreateCharacterDialog isOpen={isOpen} handleClose={handleClose}/>
        </AppBar>
    )
}

export default withStyles(styles)(Header);