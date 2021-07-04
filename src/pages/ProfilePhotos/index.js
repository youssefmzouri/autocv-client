import React, {useContext} from 'react';
import SubPage from '../../components/SubPage';
import GridProfilePhotos from './components/GridProfilePhotos';
import SessionContext from './../../context/SessionContext';
import useProfilePhotos from '../../hooks/useProfilePhotos';

export default function ProfilePhotos() {
    const {session} = useContext(SessionContext);
    const {loading, profilePhotos} = useProfilePhotos({auth: session.Authorization});
    
    return (
        <div className="laboralExperiencesContainer">
            <SubPage>
                <h2>Profile photos page</h2>
                {loading
                    ? <h4>Loading ...</h4>
                    : <GridProfilePhotos
                        photos={profilePhotos}
                        session={session}
                    />
                }
            </SubPage>
        </div>
    );
}