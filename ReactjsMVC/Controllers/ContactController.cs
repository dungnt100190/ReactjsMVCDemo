using DataAccessLibrary.Models;
using DataModel.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ReactjsMVC.Controllers
{
    [Route("api/Contact")]
    public class ContactController : Controller
    {
        private readonly IContactHandler _contactHdl = new ContactHandler(new EntityRepository<Contact>(new ContactDBContext()));

        [HttpGet("[action]")]
        public IEnumerable<Contact> GetContacts()
        {
            var data = _contactHdl.GetAllContact();
            return data;
        }

        [HttpPost, Produces("application/json")]
        public IActionResult SaveContact([FromBody] Contact model)
        {
            return Json(_contactHdl.SaveContact(model));
        }

        [HttpDelete]
        public IActionResult DeleteContactByID(int id)
        {
            return Json(_contactHdl.DeleteContactByID(id));
        }

    }
}