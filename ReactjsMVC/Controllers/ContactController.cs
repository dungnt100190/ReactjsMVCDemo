using DataModel;
using DataModel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;

namespace ReactjsMVC.Controllers
{
    public class ContactController : Controller
    {
        private DataHandler _dataHandler;

        public ContactController(IOptions<AppSetting> setting)
        {
            _dataHandler = new DataHandler(setting.Value);
        }

        [HttpGet]
        [Route("api/Contact/GetAllContacts")]
        public IEnumerable<Contact> GetAllContacts()
        {
            var data = _dataHandler.Contact.GetAll();
            return data;
        }

        [HttpGet]
        [Route("api/Contact/GetDetailContact/{id}")]
        public Contact GetDetailContact(int id)
        {
            var data = _dataHandler.Contact.Get(id);
            return data;
        }

        [HttpPost]
        [Route("api/Contact/SaveContact")]
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

        [HttpDelete]
        [Route("api/Contact/DeleteContactByID/{id}")]
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