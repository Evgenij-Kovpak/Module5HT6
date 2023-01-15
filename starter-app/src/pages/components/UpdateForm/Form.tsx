import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material'
import { useState } from 'react'
import * as apiClient from '../../../api/modules/users'

const defaultData = {
    name: '',
    job: ''
};

const Form = (props: any) => {
    const [open, setOpen] = useState(true);
    const [data, setData] = useState(defaultData);

    const handleChange = (outData: any) => {
        setData(outData)
    };

    const handleClose = () => {
        setOpen(false);
        setData(defaultData);
        props.callBackClose();
    };

    const onSubmit = async () => {
        await apiClient.updateUser({ id: props.id, name: data.name, job: data.job });
        handleClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-title'>
                <DialogTitle id='form-title' />
                <DialogContent>
                    <DialogContentText textAlign='center'>Update User</DialogContentText>
                    <TextField
                        error={data.name.length < 1}
                        autoFocus
                        margin='dense'
                        label='User Name'
                        type='text'
                        fullWidth
                        value={data.name}
                        onChange={(event) => handleChange({ ...data, name: event.target.value })}
                    />
                    <TextField
                        error={data.job.length < 1}
                        autoFocus
                        margin='dense'
                        label='Job'
                        type='text'
                        fullWidth
                        value={data.job}
                        onChange={(event) => handleChange({ ...data, job: event.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onSubmit} color='primary'>Submit</Button>
                    <Button onClick={handleClose} color='primary'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Form;