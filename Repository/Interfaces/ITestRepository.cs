using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repository.Interfaces;
using Repository.Models;

namespace Repository.Interfaces;

public interface ITestRepository : IRepository<Test>
{
    IEnumerable<Test> GetAllTests();
}