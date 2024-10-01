using BankAPI.Entity;

namespace BankAPI.DTOs
{
    public class ReqTransactionDto
    {
        public int AccountNumber { get; set; }
        public decimal Amount { get; set; }
        public string? Description { get; set; }
        public TransactionType Type { get; set; }
        public int? TargetAccountNumber { get; set; } // For transfers
    }
}
