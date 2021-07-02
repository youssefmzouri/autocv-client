import React, {useContext} from 'react';
import SubPage from '../../components/SubPage';
import TableAcademicExperience from './components/TableAcademicExperience';
import SessionContext from './../../context/SessionContext';
// import useLaboralExperience from '../../hooks/useLaboralExperience';

export default function AcademicExperience() {
    const {session} = useContext(SessionContext);
    // const {loading, laboralExp} = useLaboralExperience({auth: session.Authorization});
    
    return (
        <div className="academicExperiencesContainer">
            <SubPage>
                <h2>Academic experience page</h2>
                {/* {loading
                    ? 'Loading ...'
                    : <TableLaboralExperience
                        laboralExp={laboralExp}
                        session={session}
                    />
                } */}
                <TableAcademicExperience
                    laboralExp={null}
                    session={session}
                />
            </SubPage>
        </div>
    );
}