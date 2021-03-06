﻿using DataModel.Models;
using System;

namespace DataModel
{
    public class DataHandler : IDisposable
    {
        private ContactDBContext _context;
        private EntityRepository<Contact> _contact;

        public DataHandler(AppSetting setting)
        {
            _context = new ContactDBContext(setting);
        }

        public EntityRepository<Contact> Contact
        {
            get
            {
                if (_contact == null)
                {
                    _contact = new EntityRepository<Contact>(_context);
                }
                return _contact;
            }
        }

        #region IDisposable Support
        private bool disposed = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
