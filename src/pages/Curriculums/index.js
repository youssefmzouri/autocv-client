import React, {useContext} from 'react';
import SubPage from '../../components/SubPage';
import TableCurriculums from './components/TableCurriculums';
import SessionContext from './../../context/SessionContext';
import useCurriculums from '../../hooks/useCurriculums';

export default function Curriculums() {
    const {session} = useContext(SessionContext);
    const {loading, curriculums} = useCurriculums({auth: session.Authorization});
    
    return (
        <div className="curriculumsContainer">
            <SubPage>
                <h2>Curriculums page</h2>
                {loading
                    ? 'Loading ...'
                    : <TableCurriculums
                        curriculums={curriculums}
                    />
                }
            </SubPage>
        </div>
    );
}