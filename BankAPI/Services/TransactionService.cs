using BankAPI.DataAccess;
using BankAPI.DTOs;
using BankAPI.Entity;
using Microsoft.EntityFrameworkCore;

namespace BankAPI.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TransactionService> _logger;

        public TransactionService(ITransactionRepository transactionRepository, ApplicationDbContext context, ILogger<TransactionService> logger)
        {
            _transactionRepository = transactionRepository;
            _context = context;
            _logger = logger;
        }

        public async Task<List<ResTransactionDto>> GetAllTransactionsAsync(
            int? accountNumber = null,
            int? targetAccountNumber = null,
            decimal? minAmount = null,
            decimal? maxAmount = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            TransactionType? type = null,
            int page = 1,
            int pageSize = 10)
        {
            var transactions = await _transactionRepository.GetTransactionsAsync(
                accountNumber, targetAccountNumber, minAmount, maxAmount, startDate, endDate, type, page, pageSize);

            return transactions.Select(t => new ResTransactionDto
            {
                TransactionId = t.TransactionId,
                AccountNumber = t.AccountNumber,
                Amount = t.Amount,
                TransactionDate = t.TransactionDate,
                Description = t.Description,
                Type = t.Type,
                TargetAccountNumber = t.TargetAccountNumber
            }).ToList();
        }

        public async Task AddTransactionAsync(Transaction transaction)
        {
            var account = _context.Accounts.FirstOrDefault(a => a.AccountNumber == transaction.AccountNumber);
            if (account == null)
            {
                throw new InvalidOperationException("Account not found.");
            }

            switch (transaction.Type)
            {
                case TransactionType.Deposit:
                    account.Balance += transaction.Amount;
                    break;
                case TransactionType.Withdraw:
                    if (account.Balance < transaction.Amount)
                    {
                        throw new InvalidOperationException("Insufficient funds.");
                    }
                    account.Balance -= transaction.Amount;
                    break;
                case TransactionType.Transfer:
                    var targetAccount = _context.Accounts.FirstOrDefault(a => a.AccountNumber == transaction.TargetAccountNumber);
                    if (targetAccount == null)
                    {
                        throw new InvalidOperationException("Target account not found.");
                    }
                    if (account.Balance < transaction.Amount)
                    {
                        throw new InvalidOperationException("Insufficient funds.");
                    }
                    account.Balance -= transaction.Amount;
                    targetAccount.Balance += transaction.Amount;
                    break;
                default:
                    throw new InvalidOperationException("TransactionType is incorrect.");
            }

            await _transactionRepository.AddTransactionAsync(transaction);
        }
    }
}
