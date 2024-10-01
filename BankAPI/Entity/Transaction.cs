namespace BankAPI.Entity
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public int AccountNumber { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string? Description { get; set; }
        public TransactionType Type { get; set; }
        public int? TargetAccountNumber { get; set; } // For transfers
    }
}
