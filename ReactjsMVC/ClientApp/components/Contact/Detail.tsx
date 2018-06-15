import * as React from 'react';
import * as models from '../../_models';

interface DetailState {
    contact: models.Contact;
    loading: boolean;
}

interface DetailProps {
    id: number
}   

export class DetailContact extends React.Component<DetailProps, DetailState> {
    constructor(props) {
        super(props);
        this.state = {
            contact: null,
            loading: true
        };
        fetch('api/Contact/GetDetailContact/' + this.props.id)
            .then(response => response.json() as Promise<models.Contact>)
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
            : DetailContact.renderDetail(this.state.contact);
        return <div>
            <h1>Contact Detail</h1>
            {content}
        </div>;
    }

    private static renderDetail(item: models.Contact) {
        return <div className="detail">
            <label>Id</label><div>{item.contactId}</div>
            <label>First Name</label><div>{item.firstName}</div>
            <label>Last Name</label><div>{item.lastName}</div>
            <label>Email</label><div>{item.email}</div>
            <label>Phone</label><div>{item.phone}</div>
        </div>;
    }
}