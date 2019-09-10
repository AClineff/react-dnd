import React, { useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Table, TableRow, TableCell, Checkbox, FormControlLabel, TableBody, Dialog, DialogContent, FormLabel, DialogActions, Button } from '@material-ui/core';

const MAX_NUM_OF_INLINE_OPTIONS = 1;

const styles = () => ({
    root: {
        display: 'flex'
    },
    childRow: {
        paddingLeft: '60px'
    },
    viewAllOptionsCell: {
        cursor: 'pointer',
        paddingLeft: '60px'
    }
})

interface IOptionsProps {
    open: boolean,
    onClose: any,
    checkboxOptions: any[],
    handleChecked: CallableFunction
}

const checkboxOptions = [{
    id: 'id1',
    name: 'Option 1',
    value: false
}, {
    id: 'id2',
    name: 'Option 2',
    value: false
}];

const checkboxReducer = (accumulator: number, currentValue: any) => {
    if (currentValue.value) return accumulator += 1;
    return accumulator;
}

const OptionsDialog: React.FunctionComponent<IOptionsProps> = ({ open, onClose, checkboxOptions, handleChecked }) => {
    return (
        <Dialog open={open} onBackdropClick={onClose}>
            <DialogContent>
                <div>
                    {checkboxOptions.map(option => (
                        <FormControlLabel key={option.id} control={<Checkbox checked={option.value} onChange={handleChecked(option)} />} label={option.name} />
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

const NestedCheckbox: React.FunctionComponent<WithStyles> = ({ classes }) => {
    const [allChecked, setAllChecked] = useState(false);
    const [someChecked, setSomeChecked] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onParentChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setAllChecked(isChecked);
        setSomeChecked(false);
        checkboxOptions.forEach(option => option.value = isChecked);
    }

    const getParentLabel = () => {
        return 'Data';
    }

    const onChildChecked = (option: any) => (event: any) => {
        const isChecked = event.target.checked;
        const thisOption = checkboxOptions.find(s => option.id === s.id);
        if (thisOption) thisOption!.value = isChecked;
        const numOfCheckedBoxes = checkboxOptions.reduce(checkboxReducer, 0);

        if (numOfCheckedBoxes === 0) {
            setSomeChecked(false);
            setAllChecked(false);
        } else if (numOfCheckedBoxes === checkboxOptions.length) {
            setSomeChecked(false);
            setAllChecked(true);
        } else {
            setSomeChecked(true);
        }
    }

    const onClickViewMore = () => {
        setIsDialogOpen(true);
    }

    const onDialogClose = () => {
        setIsDialogOpen(false);
    }

    return (
        <div className={classes.root}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <FormControlLabel control={<Checkbox indeterminate={someChecked} checked={allChecked} onChange={onParentChecked} />} label={getParentLabel()} />
                        </TableCell>
                    </TableRow>
                    {checkboxOptions.map((option, index) => {
                        if (index < MAX_NUM_OF_INLINE_OPTIONS) return (
                            <TableRow key={option.id}>
                                <TableCell className={classes.childRow}>
                                    <FormControlLabel control={<Checkbox checked={option.value} onChange={onChildChecked(option)} />} label={option.name} />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {checkboxOptions.length > MAX_NUM_OF_INLINE_OPTIONS && <TableRow key='final_row'>
                        <TableCell className={classes.viewAllOptionsCell} onClick={onClickViewMore}>View All Options...</TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
            <OptionsDialog open={isDialogOpen} onClose={onDialogClose} checkboxOptions={checkboxOptions} handleChecked={onChildChecked} />
        </div>
    );
}

export default withStyles(styles)(NestedCheckbox);