using System.Net.Http.Headers;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;

namespace Repository.Repositories;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, IIdentificator
{
    protected readonly DbContext Context;

    public Repository(DbContext context)
    {
        Context = context;
    }

    public async Task<TEntity> AddAsync(TEntity entity)
    {
        await Context.Set<TEntity>().AddAsync(entity);
        return entity;
    }

    public async Task<IEnumerable<TEntity>> AddRangeAsync(IEnumerable<TEntity> entities)
    {
        await Context.Set<TEntity>().AddRangeAsync(entities);
        return entities;
    }

    public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
    {
        return Context.Set<TEntity>().Where(predicate);
    }

    public async Task<TEntity> GetAsync(Guid id)
    {
        return await Context.Set<TEntity>().FindAsync(id);
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await Context.Set<TEntity>().ToListAsync();
    }

    public void Remove(TEntity entity)
    {
        Context.Set<TEntity>().Remove(entity);
    }

    public void RemoveRange(IEnumerable<TEntity> entities)
    {
        Context.Set<TEntity>().RemoveRange(entities);
    }

    public async Task<TEntity> Update(Guid id, TEntity entity)
    {
        var entry = await Context.Set<TEntity>().FindAsync(id);
        entity.Id = id;
        Context.Entry(entry).CurrentValues.SetValues(entity);

        return entry;
    }
}