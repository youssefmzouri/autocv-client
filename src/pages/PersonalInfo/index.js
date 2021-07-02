import React, {useContext} from 'react';
import SubPage from '../../components/SubPage';
import TablePersonalInfo from './components/TablePersonalInfo';
import SessionContext from './../../context/SessionContext';
// import useLaboralExperience from '../../hooks/useLaboralExperience';

export default function PersonalInfo() {
    const {session} = useContext(SessionContext);
    // const {loading, laboralExp} = useLaboralExperience({auth: session.Authorization});
    
    return (
        <div className="laboralExperiencesContainer">
            <SubPage>
                <h2>Personal info page</h2>
                {/* {loading
                    ? 'Loading ...'
                    : <TableLaboralExperience
                        laboralExp={laboralExp}
                        session={session}
                    />
                } */}
                <TablePersonalInfo
                    personalInfo={null}
                    session={session}
                />
            </SubPage>
        </div>
    );
}