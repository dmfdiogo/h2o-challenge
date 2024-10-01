using BankAPI.Entity;

namespace BankAPI.DataAccess
{
    public interface ITransactionRepository
    {
        Task<List<Transaction>> GetTransactionsAsync(
            int? accountNumber = null,
            int? targetAccountNumber = null,
            decimal? minAmount = null,
            decimal? maxAmount = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            TransactionType? type = null,
            int page = 1,
            int pageSize = 10);

        Task AddTransactionAsync(Transaction transaction);
    }
}
