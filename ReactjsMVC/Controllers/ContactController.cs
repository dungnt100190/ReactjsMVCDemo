using DataAccessLibrary.Models;
using DataModel;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace ReactjsMVC.Controllers
{
    [Route("api/Contact")]
    public class ContactController : Controller
    {
        private DataHandler _dataHandler = new DataHandler();

        [HttpGet("[action]")]
        public IEnumerable<Contact> GetAllContacts()
        {
            var data = _dataHandler.Contact.GetAll();
            return data;
        }

        [HttpGet("{id}")]
        public Contact GetDetailContact(int id)
        {
            var data = _dataHandler.Contact.Get(id);
            return data;
        }

        [HttpPost]
        public bool SaveContact([FromBody] Contact model)
        {
            Contact contact = _dataHandler.Contact.GetAll(filter: x => x.ContactId == model.ContactId).FirstOrDefault();
            if (contact == null)
            {
                contact = new Contact()
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    Phone = model.Phone
                };
                return _dataHandler.Contact.Insert(contact);
            }
            else
            {
                contact.FirstName = model.FirstName;
                contact.LastName = model.LastName;
                contact.Email = model.Email;
                contact.Phone = model.Phone;
                return _dataHandler.Contact.Update(contact);
            }
        }

        [HttpDelete("{id}")]
        public bool DeleteContactByID(int id)
        {
            Contact contact = _dataHandler.Contact.GetAll(filter: x => x.ContactId == id).FirstOrDefault();
            if (contact != null)
            {
                return _dataHandler.Contact.Delete(contact);
            }
            return false;
        }

    }
}