namespace BankAPI.Entity
{
    public class Customer
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public ICollection<Account> Accounts { get; set; } = new List<Account>();
    }
}
