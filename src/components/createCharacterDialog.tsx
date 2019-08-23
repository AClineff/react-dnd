import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, WithStyles, withStyles, DialogActions, Button } from '@material-ui/core';
import { Character } from '../shared/types/character';
import { createEmptyCharacterObject } from '../shared/characterUtils';

const styles = () => ({
    formFields: {
        margin: "10px 20px"
    }
})

interface OwnProps {
    isOpen: boolean
    handleClose: (()=>void)
}

type Props = OwnProps & WithStyles

type FormValuesIndex = {
    [propName: string] : string | number | boolean | undefined
}

type FormValues = Character & FormValuesIndex

const formConfig = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'playerName',
        label: 'Player Name'
    },
    {
        id: 'currentHp',
        label: 'HP'
    },
    {
        id: 'totalHp',
        label: 'Total HP'
    }
]

const CreateCharacterDialog:React.FunctionComponent<Props> = (props) => {
    const {isOpen, handleClose, classes} = props;
    const [formValues, updateFormValues] = useState<FormValues>(createEmptyCharacterObject());

    const handleChange = (name:string) => (event:any) => {
        const myEvent = {...event}
        updateFormValues((prev: FormValues) => {
            return {...prev, [name]: myEvent.target.value}
        })
    }

    const handleCancel = () => {
        updateFormValues(createEmptyCharacterObject());
        handleClose();
    }

    const handleSave = () => {
        console.log('Going to save character with form values ', formValues);
        handleCancel();
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle>Create Character</DialogTitle>
            <DialogContent>
                <form>
                    {
                       formConfig.map(config => {
                           return (
                            <TextField
                                key={config.id}
                                id={`${config.id}-field`}
                                label={config.label}
                                className={classes.formFields}
                                value={formValues[config.id]}
                                onChange={handleChange('name')}
                                variant="outlined"
                            />
                           )
                       })
                    }
                </form>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleCancel}>Cancel</Button>
                <Button color="primary" onClick={handleSave}>Save</Button>
            </DialogActions>

        </Dialog>
    );
}

export default withStyles(styles)(CreateCharacterDialog);