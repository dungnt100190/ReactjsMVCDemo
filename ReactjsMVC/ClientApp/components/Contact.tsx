import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as models from '../../ClientApp/_models';

interface ContactState {
    contact: models.Contact[];
    loading: boolean;
}

export class Contact extends React.Component<RouteComponentProps<{}>, ContactState> {
    constructor(props) {
        super(props);
        this.state = {
            contact: [],
            loading: true
        };
        fetch('api/Contact/GetContacts')
            .then(response => response.json() as Promise<models.Contact[]>)
            .then(data => {
                this.setState({
                    contact: data,
                    loading: false,
                });
            });
    }

    public render() {
        let content = this.state.loading
            ? <p>Loading...</p>
            : this.renderTable(this.state.contact);

        return <div>
            <h1>Contact</h1>
            {content}
        </div>;
    }

    private renderTable(contact: models.Contact[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {contact.map(item =>
                    <tr key={item.contactId}>
                        <td>{item.contactId}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}