import React, {useContext} from 'react';
import SubPage from '../../components/SubPage';
import TableComponent from '../../components/Table';
import SessionContext from './../../context/SessionContext';
import useCurriculums from '../../hooks/useCurriculums';

export default function Curriculums() {
    const {session} = useContext(SessionContext);
    const {loading, curriculums} = useCurriculums({auth: session.Authorization});

    const headerRows = [
        {
            content: 'Name', 
            align: 'left'
        }, 
        {
            content: 'Description', 
            align: 'right'
        },
        {
            content: 'Num. Projects', 
            align: 'right'
        }, 
        {
            content: 'Language', 
            align: 'right'
        }
    ];
    const bodyRows = [];
    return (
        <div className="curriculumsContainer">
            <SubPage>
                <h2>Curriculums page</h2>
                {loading
                    ? 'Cargando ...'
                    : <TableComponent
                        headerRows={headerRows}
                        bodyRows={bodyRows}
                    />
                }
            </SubPage>
        </div>
    );
}