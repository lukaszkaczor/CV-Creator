using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using FluentValidation;

namespace API.Validators
{
    public class UserLoginValidator : AbstractValidator<UserLoginDTO>
    {
        public UserLoginValidator()
        {
            RuleFor(d => d.Login).MinimumLength(5);
            RuleFor(d => d.Password).NotEmpty();
        }
    }
}