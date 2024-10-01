namespace BankAPI.Entity
{
    public class Account
    {
        public int Id { get; set; }
        public int AccountNumber { get; set; } = 0;
        public decimal Balance { get; set; }
        public int CustomerId { get; set; }
        public required Customer Customer { get; set; }
    }
}
