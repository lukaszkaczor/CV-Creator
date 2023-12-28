using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.DTOs;
using FluentValidation;

namespace API.Utilities.Validators
{
    public class PersonalDataDTOValidator : AbstractValidator<PersonalDataDTO>
    {
       public PersonalDataDTOValidator()
        {
            RuleFor(d=>d.FirstName).NotEmpty().WithMessage("bagno");
            // RuleFor(d=>d.HtmlContent).NotEmpty();
            // RuleFor(d=>d.Styles).NotEmpty();
        }
    }
}