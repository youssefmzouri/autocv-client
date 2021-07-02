import React, {useContext} from 'react';
import SubPage from '../../components/SubPage';
import GridProfilePhotos from './components/GridProfilePhotos';
import SessionContext from './../../context/SessionContext';
// import useLaboralExperience from '../../hooks/useLaboralExperience';

export default function ProfilePhotos() {
    const {session} = useContext(SessionContext);
    // const {loading, laboralExp} = useLaboralExperience({auth: session.Authorization});
    
    return (
        <div className="laboralExperiencesContainer">
            <SubPage>
                <h2>Profile photos page</h2>
                {/* {loading
                    ? 'Loading ...'
                    : <TableLaboralExperience
                        laboralExp={laboralExp}
                        session={session}
                    />
                } */}
                <GridProfilePhotos
                    photos={null}
                    session={session}
                />
            </SubPage>
        </div>
    );
}