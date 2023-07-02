﻿using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Models;

public class CvTemplate : IIdentificator
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string HtmlContent { get; set; }
    public string Styles { get; set; }
    public bool IsActive { get; set; }
    public DateTime ModifyDate { get; set; }
}
