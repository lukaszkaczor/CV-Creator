namespace Repository.Interfaces;

public interface IUnitOfWork : IDisposable
{
    ITestRepository Tests { get; }
    int Complete();
}