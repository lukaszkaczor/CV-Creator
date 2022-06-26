using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class UserLogin
{
    public int Id { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }



}