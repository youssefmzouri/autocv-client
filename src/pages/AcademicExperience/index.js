import React, {useContext} from 'react';
import SubPage from '../../components/SubPage';
import TableAcademicExperience from './components/TableAcademicExperience';
import SessionContext from './../../context/SessionContext';
import useAcademicExperience from '../../hooks/useAcademicExperience';

export default function AcademicExperience() {
    const {session} = useContext(SessionContext);
    const {loading, academicExp} = useAcademicExperience({auth: session.Authorization});
    
    return (
        <div className="academicExperiencesContainer">
            <SubPage>
                <h2>Academic experience page</h2>
                {loading
                    ? 'Loading ...'
                    : <TableAcademicExperience
                        academicExp={academicExp}
                        session={session}
                    />
                }
            </SubPage>
        </div>
    );
}