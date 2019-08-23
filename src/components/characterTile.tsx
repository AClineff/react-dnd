import React from 'react';
import { Card, CardHeader, WithStyles, withStyles } from '@material-ui/core';
import { Character } from '../shared/types/character';

const styles = () => ({
    characterCard: {
        maxWidth: '400px'
    }
})

interface OwnProps {
    character: Character
}

type Props = OwnProps & WithStyles

const CharacterTile: React.FunctionComponent<Props> = (props: Props) => {
    const {classes, character} = props;
    return (
        <Card className={classes.characterCard}>
            <CardHeader title={character.name} subheader={character.playerName} />
        </Card>
    )
}

export default withStyles(styles)(CharacterTile);