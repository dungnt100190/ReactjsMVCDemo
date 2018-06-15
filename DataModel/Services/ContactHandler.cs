using DataAccessLibrary.Models;
using System.Linq;

namespace DataModel.Services
{
    public interface IContactHandler
    {
        IQueryable<Contact> GetAllContact();
        bool SaveContact(Contact model);
        bool DeleteContactByID(int id);
    }

    public class ContactHandler : IContactHandler
    {
        private IEntityRepository<Contact> _repository;

        public ContactHandler(IEntityRepository<Contact> repository)
        {
            _repository = repository;
        }

        public IQueryable<Contact> GetAllContact()
        {
            return _repository.GetAll();
        }

        public bool SaveContact(Contact entity)
        {
            Contact contact = _repository.GetAll(filter: x => x.ContactId == entity.ContactId).FirstOrDefault();
            if (contact == null)
            {
                contact = new Contact()
                {
                    FirstName = entity.FirstName,
                    LastName = entity.LastName,
                    Email = entity.Email,
                    Phone = entity.Phone
                };
                return _repository.Insert(contact);
            }
            else
            {
                contact.FirstName = entity.FirstName;
                contact.LastName = entity.LastName;
                contact.Email = entity.Email;
                contact.Phone = entity.Phone;
                return _repository.Update(contact);
            }
        }

        public bool DeleteContactByID(int id)
        {
            Contact contact = _repository.GetAll(filter: x => x.ContactId == id).FirstOrDefault();
            if (contact != null)
            {
                return _repository.Delete(contact);
            }
            return false;
        }
    }
}
