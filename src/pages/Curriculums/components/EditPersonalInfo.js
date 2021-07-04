import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AlertDialog from '../../../components/AlertDialog';

import personalInfoService from '../../../services/personalInfo';
import cvService from '../../../services/curriculums';
import { useEffect } from 'react';

function ListPersonalInformation({rows, handleSelectOne}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column' }}>
            {rows.map(row => {
                return <p key={row.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '25px' }}>
                    <span style={{color: 'black' }}>{row.id}</span>
                    <Button variant="contained" color="primary" onClick={() => handleSelectOne(row.id)}>Select</Button>
                </p>
            })}
        </div>
    );
}


export default function EditPersonalInfo({classes, session, cv}) {
    const [pi, setPi] = useState('');

    useEffect( () => {
        if (cv.userProfile && cv.userProfile.id) {
            setPi(cv.userProfile.id);
        }
    }, [cv.userProfile]);

    const [propsDialog, setPropsDialog] = useState({
        dialogState: false,
        title: '',
        bodyText: '',
        showAcceptButon: false,
        onCancel: () => {}
    });

    const savePersonalInfoSelected = async (id) => {
        console.log('selected pi: ', id);
        const data  = {
            userProfile: id,
        };
        await cvService.updateUserCurriculum({"Authorization": session.Authorization}, cv.id, data);
        setPi(id);
        setPropsDialog({dialogState: false});
    }

    const handleSelectPersonalInfo = async () => {
        const data = await personalInfoService.getUserPersonalInfo({Authorization: session.Authorization});
        
        setPropsDialog({
            dialogState: true,
            title: 'Which one do you want to include in your CV?',
            bodyText: <ListPersonalInformation rows={data} handleSelectOne={savePersonalInfoSelected}/>,
            showAcceptButon: false,
            onCancel: () => {
                setPropsDialog({dialogState: false});
            }
        });
    }

    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Personal info
                    </Typography>
                    <Typography variant="body2" align='left' component="p">
                        {pi ? pi : 'Nothing selected yet ...'}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actionsCard}>
                    <Button variant="contained" color='primary' size="small" onClick={handleSelectPersonalInfo}>Select profile info</Button>
                </CardActions>
            </Card>
            <AlertDialog {...propsDialog} />
        </>
    );
}