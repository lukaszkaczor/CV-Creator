namespace API.Models;

public class UserLogin
{
    public UserLogin(string login, string password)
    {
        this.Login = login;
        this.Password = password;

    }
    public string Login { get; set; }
    public string Password { get; set; }



}