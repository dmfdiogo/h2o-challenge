using BankAPI.DTOs;
using BankAPI.Entity;

public interface ITransactionService
{
    Task<List<ResTransactionDto>> GetAllTransactionsAsync(
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
