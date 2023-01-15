import { FC } from 'react';
import {
    CardContent,
    Typography
} from '@mui/material';
import { IResources } from '../../../interfaces/resources';

const ResourcesFilling: FC<IResources> = (resource) => {
    const color = resource.color;
    return (
        <>
            <CardContent>
                <Typography noWrap gutterBottom variant='h6' component='div'>
                    Name: {resource?.name}
                </Typography>
                <Typography noWrap gutterBottom variant='h6' component='div'>
                    Year: {resource?.year}
                </Typography>
                <Typography bgcolor={color} noWrap gutterBottom variant='h6' component='div'>
                    Color: {resource?.color}
                </Typography>
                <Typography noWrap gutterBottom variant='h6' component='div'>
                    Pantone Value: {resource?.pantone_value}
                </Typography>
            </CardContent>
        </>
    );
};

export default ResourcesFilling;