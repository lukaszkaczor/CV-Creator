using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.DTOs;
using FluentValidation;

namespace API.Utilities.Validators
{
    public class CvTemplateValidator : AbstractValidator<CvTemplateDTO>
    {
        public CvTemplateValidator()
        {
            RuleFor(d=>d.Name).NotEmpty();
            RuleFor(d=>d.HtmlContent).NotEmpty();
            RuleFor(d=>d.Styles).NotEmpty();
        }
    }
}