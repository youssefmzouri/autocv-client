import React, {useContext} from 'react';
import SubPage from '../../components/SubPage';
import TablePersonalInfo from './components/TablePersonalInfo';
import SessionContext from './../../context/SessionContext';
import usePersonalInfo from '../../hooks/usePersonalInfo';

export default function PersonalInfo() {
    const {session} = useContext(SessionContext);
    const {loading, personalInfo} = usePersonalInfo({auth: session.Authorization});
    
    return (
        <div className="laboralExperiencesContainer">
            <SubPage>
                <h2>Personal info page</h2>
                {loading
                    ? 'Loading ...'
                    : <TablePersonalInfo
                        personalInfo={personalInfo}
                        session={session}
                    />
                }
            </SubPage>
        </div>
    );
}