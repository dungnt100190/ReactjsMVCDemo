import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Modal from 'react-modal';
import * as models from '../../_models';

//import { AddEdit } from './AddEdit';
import { DetailContact } from './Detail';

interface ContactState {
    contactList: models.Contact[];
    loading: boolean;
    showAdd: boolean;
    showEdit: boolean;
    showDetail: boolean;
    activeId: number;
}

export class Contact extends React.Component<RouteComponentProps<{}>, ContactState> {
    constructor(props) {
        super(props);
        this.state = {
            contactList: [],
            loading: true,
            showAdd: false,
            showEdit: false,
            showDetail: false,
            activeId: 0
        };
        fetch('api/Contact/GetAllContacts')
            .then(response => response.json() as Promise<models.Contact[]>)
            .then(data => {
                this.setState({ contactList: data, loading: false });
            });
    }

    public render() {
        let content = this.state.loading
            ? <p><em>Loading...</em></p> 
            : this.renderTable(this.state.contactList);

        return <div>
            <h1>Contact</h1>
            <button className="action" onClick={this.handleCreate.bind(this)}>Add new</button>
            {content}
            {this.renderPopup()}
        </div>;
    }

    private renderTable(contactList: models.Contact[]) {
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
                {contactList.map(item =>
                    <tr key={item.contactId}>
                        <td>{item.contactId}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                            <button className="action" onClick={(id) => this.handleDetail(item.contactId)}>Detail</button>
                            <button className="action" onClick={(id) => this.handleEdit(item.contactId)}>Edit</button>
                            <button className="action" onClick={(id) => this.handleDelete(item.contactId)}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }

    handleCreate() {
        this.setState({ showAdd: true, showDetail: false, showEdit: false });
    }

    handleEdit(id: number) {
        this.setState({ showEdit: true, showDetail: false, showAdd: false, activeId: id });
    }

    handleDetail(id: number) {
        this.setState({ showDetail: true, showAdd: false, showEdit: false, activeId: id });
    }

    handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this?')) return;
        fetch('api/Contact/DeleteContactByID/' + id, { method: 'delete' })
            .then(data => {
                this.setState(
                    {
                        contactList: this.state.contactList.filter((rec) => {
                            return (rec.contactId != id);
                        })
                    });
            });
    }

    private renderPopup() {
        if (!this.state.showAdd && !this.state.showDetail && !this.state.showEdit) return null;
        return <Modal isOpen={true} contentLabel="Crawl">
            <button className="action" title="close" onClick={this.closeModal.bind(this)}>X</button>
            {this.renderPopupContent()}
        </Modal>;
    }

    private renderPopupContent() {
        if (this.state.showAdd) {
            //return <AddEdit id={null} dbaction="create" onSave={this.handlePopupSave.bind(this)} />;
            return "";
        }
        if (this.state.showEdit) {
            //return <AddEdit id={this.state.activeId} dbaction="edit" onSave={this.handlePopupSave.bind(this)} />;
            return "";
        }
        if (this.state.showDetail) {
            //this.props.history.push();
            return <DetailContact id={this.state.activeId} />;
        }
    }

    private closeModal() {
        this.setState({ showDetail: false, showAdd: false, showEdit: false });
    }

    private handlePopupSave(success: boolean) {
        if (success) this.setState({ showAdd: false, showEdit: false });
    }
}