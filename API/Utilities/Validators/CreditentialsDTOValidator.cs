using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Models.DTOs;
using FluentValidation;

namespace API.Validators
{
    public class CreditentialsDTOValidator : AbstractValidator<CreditentialsDTO>
    {
        public CreditentialsDTOValidator()
        {
            RuleFor(d => d.Email).EmailAddress();
            RuleFor(d => d.Password).NotEmpty();
        }
    }
}