import * as React from 'react';
import { RouteComponentProps } from 'react-router';
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
            <div><label>Id:&nbsp;</label>{item.contactId}</div>
            <div><label>First Name:&nbsp;</label>{item.firstName}</div>
            <div><label>Last Name:&nbsp;</label>{item.lastName}</div>
            <div><label>Email:&nbsp;</label>{item.email}</div>
            <div><label>Phone:&nbsp;</label>{item.phone}</div>
        </div>;
    }
}