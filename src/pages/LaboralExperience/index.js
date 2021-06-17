import React, {useContext} from 'react';
import SubPage from '../../components/SubPage';
import TableLaboralExperience from './components/TableLaboralExperience';
import SessionContext from './../../context/SessionContext';
import useLaboralExperience from '../../hooks/useLaboralExperience';

export default function LaboralExperience() {
    const {session} = useContext(SessionContext);
    const {loading, laboralExp} = useLaboralExperience({auth: session.Authorization});
    
    return (
        <div className="laboralExperiencesContainer">
            <SubPage>
                <h2>Laboral experience page</h2>
                {loading
                    ? 'Loading ...'
                    : <TableLaboralExperience
                        laboralExp={laboralExp}
                        session={session}
                    />
                }
            </SubPage>
        </div>
    );
}