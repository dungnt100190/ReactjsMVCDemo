import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Contact } from '../../_models';

interface AddEditState {
    title: string;
    contact: Contact;
    loading: boolean;
    isSaved: boolean
}

interface AddEditProps {
    id: number
    dbaction: string
    onSave?: any /* event*/
}

export class AddEdit extends React.Component<AddEditProps, AddEditState> {
    constructor(props) {
        super(props);
        if (this.props.dbaction == "edit") {
            this.state = { title: "Edit Contact", contact: null, loading: true, isSaved: false };
            fetch('api/Contact/GetDetailContact/' + this.props.id, { method: 'get' })
                .then(response => response.json() as Promise<Contact>)
                .then(data => {
                    this.setState({ contact: data, loading: false });
                });
        } else {
            this.state = { title: "Add new Contact", contact: new Contact(), loading: false, isSaved: false };
        }
    }

    public render() {
        let content = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForm(this.state.contact);
        return <div>
            <h1>{this.state.title}</h1>
            {content}
        </div>;
    }

    private renderForm(item: Contact) {
        return <form onSubmit={this.handleSave.bind(this)}>
            <div>
                <input type="hidden" name='contactId' value={item.contactId} />
            </div>
            <div>
                <label className="col-md-2">First Name</label>
                <input id='firstName' name='firstName' type='text' defaultValue={item.firstName != null ? item.firstName : ''} />
            </div>
            <div>
                <label className="col-md-2">Last Name</label>
                <input id='lastName' name='lastName' type='text' defaultValue={item.lastName != null ? item.lastName : ''} />
            </div>
            <div>
                <label className="col-md-2">Email</label>
                <input id='email' name='email' type='text' defaultValue={item.email != null ? item.email : ''} />
            </div>
            <div>
                <label className="col-md-2">Phone</label>
                <input id='phone' name='phone' type='text' defaultValue={item.phone != null ? item.phone : ''} />
            </div>
            <button type="submit" className="btn btn-default">Save</button>
        </form>;
    }

    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('api/Contact/SaveContact',
            {
                method: 'POST',
                body: data
            })
            .then((response) => response.json())
            .then(responseJson => {
                this.setState({ isSaved: responseJson });
                this.props.onSave(this.state.isSaved);
            });
    }
}