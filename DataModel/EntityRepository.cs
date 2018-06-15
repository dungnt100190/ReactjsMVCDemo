using DataAccessLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace DataModel
{
    public interface IEntityRepository<T> where T : class
    {
        IQueryable<T> GetAll(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "");
        T Get(object key);
        T Get(object[] keys);
        bool Insert(T entity);
        bool Update(T entity);
        bool Delete(object key);
        bool Delete(T entity);
    }

    public class EntityRepository<T> : IEntityRepository<T> where T : class
    {
        private ContactDBContext _context;
        private DbSet<T> _dbSet;

        public EntityRepository(ContactDBContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public IQueryable<T> GetAll(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<T> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            return query;
        }

        public T Get(object key)
        {
            return _dbSet.Find(key);
        }

        public T Get(object[] keys)
        {
            return _dbSet.Find(keys);
        }

        public bool Insert(T entity)
        {
            _dbSet.Add(entity);
            return _context.SaveChanges() >= 1;
        }

        public bool Update(T entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            return _context.SaveChanges() >= 1;
        }

        public bool Delete(object key)
        {
            T entity = _dbSet.Find(key);
            return Delete(entity);
        }

        public bool Delete(T entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
            {
                _dbSet.Attach(entity);
            }
            _dbSet.Remove(entity);
            return _context.SaveChanges() >= 1;
        }
    }
}
