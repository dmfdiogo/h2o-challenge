using BankAPI.DTOs;
using BankAPI.Entity;
public interface IAuthenticationService
{
    Task<Customer> Authenticate(string username, string password);
    string GetAuthToken(Customer customer);
}