namespace API.Models.DTOs;

public class CreditentialsDTO
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string Username { get => Email; }
}